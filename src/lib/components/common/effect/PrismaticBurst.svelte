<script lang="ts">
  import { onMount } from 'svelte';
  import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

  type Offset = {
    x?: number | string;
    y?: number | string;
  };

  export let className: string = '';
  export let style: string | undefined = undefined;
  export let intensity = 2;
  export let speed = 0.5;
  export let animationType: 'rotate' | 'rotate3d' | 'hover' = 'rotate3d';
  export let colors: string[] | undefined = undefined;
  export let distort = 0;
  export let paused = false;
  export let offset: Offset = { x: 0, y: 0 };
  export let hoverDampness = 0;
  export let rayCount: number | undefined = undefined;
  export let mixBlendMode = 'lighten';

  type UniformInputs = {
    intensity: number;
    speed: number;
    animationType: 'rotate' | 'rotate3d' | 'hover';
    colors?: string[];
    distort: number;
    offset: Offset;
    rayCount?: number;
    program: Program | null;
    renderer: Renderer | null;
    gradientTexture: Texture | null;
  };

  const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fragmentShader = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

  let container: HTMLDivElement | null = null;
  let renderer: Renderer | null = null;
  let program: Program | null = null;
  let gradientTexture: Texture | null = null;
  let mesh: Mesh | null = null;
  let triangle: Triangle | null = null;
  let canvasElement: HTMLCanvasElement | null = null;
  const mouseTarget: [number, number] = [0.5, 0.5];
  const mouseSmooth: [number, number] = [0.5, 0.5];
  let isVisible = true;
  let raf = 0;
  let last = 0;
  let accumTime = 0;
  let resizeObserver: ResizeObserver | null = null;
  let intersectionObserver: IntersectionObserver | null = null;
  let isPaused = paused;
  let hoverDamp = hoverDampness;
  let usingWindowResizeFallback = false;
  let canvasBlendMode = '';

  type WindowWithOptionalApis = Window &
    typeof globalThis & {
      ResizeObserver?: typeof ResizeObserver;
      IntersectionObserver?: typeof IntersectionObserver;
    };

  $: isPaused = paused;
  $: hoverDamp = hoverDampness;
  $: canvasBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';

  const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);

  const hexToRgb01 = (hex: string): [number, number, number] => {
    let h = hex?.trim?.() ?? '';
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) {
      const [r, g, b] = h;
      h = r + r + g + g + b + b;
    }
    const intVal = parseInt(h, 16);
    if (Number.isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
    const r = ((intVal >> 16) & 255) / 255;
    const g = ((intVal >> 8) & 255) / 255;
    const b = (intVal & 255) / 255;
    return [r, g, b];
  };

  const toPx = (value: number | string | undefined): number => {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    const num = parseFloat(String(value).replace('px', '').trim());
    return Number.isNaN(num) ? 0 : num;
  };

  const updateUniforms = ({
    intensity,
    speed,
    animationType,
    colors,
    distort,
    offset,
    rayCount,
    program,
    renderer,
    gradientTexture
  }: UniformInputs) => {
    if (!program || !renderer || !gradientTexture) return;

    program.uniforms.uIntensity.value = intensity ?? 1;
    program.uniforms.uSpeed.value = speed ?? 1;

    const animTypeMap: Record<string, number> = {
      rotate: 0,
      rotate3d: 1,
      hover: 2
    };
    program.uniforms.uAnimType.value = animTypeMap[animationType] ?? animTypeMap.rotate3d;
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;

    const ox = toPx(offset?.x);
    const oy = toPx(offset?.y);
    program.uniforms.uOffset.value = [ox, oy];
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));

    let colorCount = 0;
    if (Array.isArray(colors) && colors.length > 0) {
      const gl = renderer.gl;
      const capped = colors.slice(0, 64);
      colorCount = capped.length;
      const data = new Uint8Array(colorCount * 4);
      for (let i = 0; i < colorCount; i += 1) {
        const [r, g, b] = hexToRgb01(capped[i]);
        data[i * 4 + 0] = Math.round(r * 255);
        data[i * 4 + 1] = Math.round(g * 255);
        data[i * 4 + 2] = Math.round(b * 255);
        data[i * 4 + 3] = 255;
      }
      gradientTexture.image = data;
      gradientTexture.width = colorCount;
      gradientTexture.height = 1;
      gradientTexture.minFilter = gl.LINEAR;
      gradientTexture.magFilter = gl.LINEAR;
      gradientTexture.wrapS = gl.CLAMP_TO_EDGE;
      gradientTexture.wrapT = gl.CLAMP_TO_EDGE;
      gradientTexture.flipY = false;
      gradientTexture.generateMipmaps = false;
      gradientTexture.format = gl.RGBA;
      gradientTexture.type = gl.UNSIGNED_BYTE;
      gradientTexture.needsUpdate = true;
    }
    program.uniforms.uColorCount.value = colorCount;
  };

  const resizeRenderer = () => {
    if (!renderer || !program || !container) return;
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h);
    program.uniforms.uResolution.value = [
      renderer.gl.drawingBufferWidth,
      renderer.gl.drawingBufferHeight
    ];
  };

  const updateMouseTarget = (event: PointerEvent) => {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
    const y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    mouseTarget[0] = clamp(x);
    mouseTarget[1] = clamp(y);
  };

  const animate = (now: number) => {
    const visible = isVisible && !document.hidden;
    const dt = Math.max(0, now - last) * 0.001;
    last = now;
    if (!isPaused) {
      accumTime += dt;
    }

    if (!visible || !renderer || !program || !mesh) {
      raf = requestAnimationFrame(animate);
      return;
    }

    const tau = 0.02 + clamp(hoverDamp) * 0.5;
    const alpha = 1 - Math.exp(-dt / tau);
    mouseSmooth[0] += (mouseTarget[0] - mouseSmooth[0]) * alpha;
    mouseSmooth[1] += (mouseTarget[1] - mouseSmooth[1]) * alpha;

    program.uniforms.uMouse.value = mouseSmooth;
    program.uniforms.uTime.value = accumTime;

    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(animate);
  };

  const removeIfPossible = (obj: unknown) => {
    if (obj && typeof (obj as { remove?: unknown }).remove === 'function') {
      (obj as { remove: () => void }).remove();
    }
  };

  const disposeGlResources = () => {
    removeIfPossible(mesh);
    removeIfPossible(triangle);
    removeIfPossible(program);
    if (renderer?.gl && gradientTexture?.texture) {
      renderer.gl.deleteTexture(gradientTexture.texture);
    }
    renderer = null;
    program = null;
    gradientTexture = null;
    mesh = null;
    triangle = null;
  };

  onMount(() => {
    if (!container || !canvasElement || typeof window === 'undefined') return;
    const win = window as WindowWithOptionalApis;
    const dpr = Math.min(win.devicePixelRatio || 1, 2);
    const createdRenderer = new Renderer({
      dpr,
      alpha: false,
      antialias: false,
      canvas: canvasElement
    });
    renderer = createdRenderer;
    const { gl } = createdRenderer;

    const white = new Uint8Array([255, 255, 255, 255]);
    gradientTexture = new Texture(gl, {
      image: white,
      width: 1,
      height: 1,
      generateMipmaps: false,
      flipY: false
    });
    gradientTexture.minFilter = gl.LINEAR;
    gradientTexture.magFilter = gl.LINEAR;
    gradientTexture.wrapS = gl.CLAMP_TO_EDGE;
    gradientTexture.wrapT = gl.CLAMP_TO_EDGE;

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },
        uIntensity: { value: 1 },
        uSpeed: { value: 1 },
        uAnimType: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uColorCount: { value: 0 },
        uDistort: { value: 0 },
        uOffset: { value: [0, 0] },
        uGradient: { value: gradientTexture },
        uNoiseAmount: { value: 0.8 },
        uRayCount: { value: 0 }
      }
    });

    triangle = new Triangle(gl);
    mesh = new Mesh(gl, { geometry: triangle, program });

    resizeRenderer();
    if (win.ResizeObserver) {
      resizeObserver = new win.ResizeObserver(resizeRenderer);
      resizeObserver.observe(container);
    } else {
      win.addEventListener('resize', resizeRenderer);
      usingWindowResizeFallback = true;
    }

    const pointerOptions: AddEventListenerOptions = { passive: true };
    container.addEventListener('pointermove', updateMouseTarget, pointerOptions);

    if (win.IntersectionObserver) {
      intersectionObserver = new win.IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            isVisible = entries[0].isIntersecting;
          }
        },
        { root: null, threshold: 0.01 }
      );
      intersectionObserver.observe(container);
    }

    last = performance.now();
    accumTime = 0;
    raf = requestAnimationFrame(animate);
    updateUniforms({
      intensity,
      speed,
      animationType,
      colors,
      distort,
      offset,
      rayCount,
      program,
      renderer,
      gradientTexture
    });

    return () => {
      cancelAnimationFrame(raf);
      if (container) {
        container.removeEventListener('pointermove', updateMouseTarget, pointerOptions);
      }
      resizeObserver?.disconnect();
      if (usingWindowResizeFallback) {
        win.removeEventListener('resize', resizeRenderer);
        usingWindowResizeFallback = false;
      }
      intersectionObserver?.disconnect();
      disposeGlResources();
    };
  });

  $: updateUniforms({
    intensity,
    speed,
    animationType,
    colors,
    distort,
    offset,
    rayCount,
    program,
    renderer,
    gradientTexture
  });
</script>

<div
  class={`prismatic-burst-container ${className}`.trim()}
  style={style}
  bind:this={container}
>
  <canvas
    class="prismatic-burst-canvas"
    aria-hidden="true"
    style={canvasBlendMode ? `mix-blend-mode: ${canvasBlendMode};` : undefined}
    bind:this={canvasElement}
  ></canvas>
</div>

<style>
  .prismatic-burst-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .prismatic-burst-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

</style>
