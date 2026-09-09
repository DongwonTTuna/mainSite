import {
  Box3,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  type Material,
  Mesh,
  NeutralToneMapping,
  type Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
  type WebGLRenderTarget,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export type TunaSceneController = {
  setPlaying: (playing: boolean) => void;
  setVisible: (visible: boolean) => void;
  replay: () => void;
  dispose: () => void;
};

type SceneCallbacks = { onReady: () => void; onError: () => void };

function disposeModel(root: Group) {
  const geometries = new Set<Mesh["geometry"]>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material)
      ? object.material
      : [object.material]) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof Texture) textures.add(value);
      }
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}

export function createTunaScene(
  canvas: HTMLCanvasElement,
  callbacks: SceneCallbacks,
): TunaSceneController {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(new Color("#f8f7f3"), 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 50);
  const tuna = new Group();
  scene.add(tuna);
  scene.add(new HemisphereLight("#fff5db", "#3b607a", 1.2));
  const keyLight = new DirectionalLight("#fff1da", 2.2);
  keyLight.position.set(-3, 5, 6);
  scene.add(keyLight);
  const rimLight = new DirectionalLight("#a7dff5", 2.4);
  rimLight.position.set(4, 2, -3);
  scene.add(rimLight);

  let environmentGenerator: PMREMGenerator | undefined;
  let room: RoomEnvironment | undefined;
  let environment: WebGLRenderTarget | undefined;
  try {
    environmentGenerator = new PMREMGenerator(renderer);
    room = new RoomEnvironment();
    environment = environmentGenerator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.65;
  } catch (error) {
    environment?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    throw error;
  } finally {
    room?.dispose();
    environmentGenerator?.dispose();
  }

  const abortController = new AbortController();
  let disposed = false;
  let ready = false;
  let playing = true;
  let visible = true;
  let elapsed = 0;
  let entrance = 0;
  let lastTimestamp = 0;
  let normalizedScale = 1;
  let modelSize = new Vector3(5, 4, 2);
  let pointerHorizontal = 0;
  let pointerVertical = 0;
  let model: Group | undefined;
  let tail: Object3D | undefined;
  let tailRestRotation = 0;

  function fitCanvas() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height || disposed) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const fieldOfView = (camera.fov * Math.PI) / 180;
    const framingSize = Math.max(modelSize.y, modelSize.x / camera.aspect);
    camera.position.set(
      0,
      0,
      (framingSize / (2 * Math.tan(fieldOfView / 2))) * 1.13 +
        modelSize.z * 0.4,
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    if (ready && visible) renderer.render(scene, camera);
  }

  function frame(timestamp: number) {
    if (disposed || !ready) return;
    if (lastTimestamp && timestamp - lastTimestamp < 1000 / 30) return;
    const delta = lastTimestamp
      ? Math.min((timestamp - lastTimestamp) / 1000, 0.08)
      : 0;
    lastTimestamp = timestamp;
    elapsed += delta;
    entrance = Math.min(entrance + delta / 1.7, 1);
    const arrival = 1 - (1 - entrance) ** 3;
    tuna.scale.setScalar(normalizedScale * (0.86 + arrival * 0.14));
    tuna.position.set(
      (1 - arrival) * 0.45,
      Math.sin(elapsed * 0.95) * 0.065 - (1 - arrival) * 0.28,
      0,
    );
    tuna.rotation.x += (-pointerVertical * 0.15 - tuna.rotation.x) * 0.08;
    tuna.rotation.y +=
      (-0.12 +
        pointerHorizontal * 0.65 +
        Math.sin(elapsed * 0.7) * 0.055 -
        tuna.rotation.y) *
      0.08;
    tuna.rotation.z = Math.sin(elapsed * 0.65) * 0.014;
    if (tail)
      tail.rotation.y = tailRestRotation + Math.sin(elapsed * 2.4) * 0.07;
    renderer.render(scene, camera);
  }

  function syncPlayback() {
    lastTimestamp = 0;
    renderer.setAnimationLoop(
      ready && playing && visible && !disposed ? frame : null,
    );
  }

  function movePointer(event: PointerEvent) {
    if (event.pointerType !== "mouse" || !playing) return;
    const bounds = canvas.getBoundingClientRect();
    pointerHorizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerVertical = (event.clientY - bounds.top) / bounds.height - 0.5;
  }

  function resetPointer() {
    pointerHorizontal = 0;
    pointerVertical = 0;
  }

  function contextLost(event: Event) {
    event.preventDefault();
    if (!disposed) callbacks.onError();
  }

  const resizeObserver = new ResizeObserver(fitCanvas);
  resizeObserver.observe(canvas);
  canvas.addEventListener("pointermove", movePointer);
  canvas.addEventListener("pointerleave", resetPointer);
  canvas.addEventListener("webglcontextlost", contextLost);
  const loadTimeout = window.setTimeout(() => {
    if (!ready && !disposed) callbacks.onError();
  }, 12000);

  async function loadModel() {
    const response = await fetch("/models/dongwon-tuna.glb", {
      signal: abortController.signal,
    });
    if (!response.ok) throw new Error(`Tuna model returned ${response.status}`);
    const bytes = await response.arrayBuffer();
    if (disposed) return;
    const gltf = await new GLTFLoader().parseAsync(bytes, "/models/");
    if (disposed) {
      disposeModel(gltf.scene);
      return;
    }
    model = gltf.scene;
    tail = model.getObjectByName("Tail");
    tailRestRotation = tail?.rotation.y ?? 0;
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    normalizedScale = 5 / Math.max(size.x, size.y, size.z);
    modelSize = size.multiplyScalar(normalizedScale);
    model.position.sub(center);
    tuna.add(model);
    tuna.scale.setScalar(normalizedScale);
    ready = true;
    window.clearTimeout(loadTimeout);
    fitCanvas();
    callbacks.onReady();
    syncPlayback();
  }

  void loadModel().catch((error: unknown) => {
    if (disposed) return;
    console.warn("The tuna artwork is using its static render.", error);
    callbacks.onError();
  });

  return {
    setPlaying(nextPlaying) {
      playing = nextPlaying;
      syncPlayback();
    },
    setVisible(nextVisible) {
      visible = nextVisible;
      syncPlayback();
    },
    replay() {
      entrance = 0;
      elapsed = 0;
      playing = true;
      syncPlayback();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      abortController.abort();
      window.clearTimeout(loadTimeout);
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", movePointer);
      canvas.removeEventListener("pointerleave", resetPointer);
      canvas.removeEventListener("webglcontextlost", contextLost);
      if (model) disposeModel(model);
      environment?.dispose();
      renderer.dispose();
    },
  };
}
