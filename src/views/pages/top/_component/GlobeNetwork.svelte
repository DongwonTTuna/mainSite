<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  let container: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let globe: THREE.Group
  let atmosphere: THREE.Mesh
  let particles: THREE.Points
  let dataFlows: THREE.Group
  let animationId: number
  let raycaster: THREE.Raycaster
  let mouse: THREE.Vector2
  let hoveredCity: DataPoint | null = null
  let selectedCity: DataPoint | null = null
  let tooltip: HTMLDivElement

  const GLOBE_RADIUS = 2
  const PARTICLE_COUNT = 300
  const CITY_COUNT = 50
  const DATA_FLOW_COUNT = 20

  interface DataPoint {
    position: THREE.Vector3
    lat: number
    lng: number
    intensity: number
    name?: string
    mesh?: THREE.Mesh
  }

  interface DataFlow {
    curve: THREE.CatmullRomCurve3
    progress: number
    speed: number
    particles: THREE.Points
  }

  let cityPoints: DataPoint[] = []
  let activeFlows: DataFlow[] = []

  function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const x = -radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    return new THREE.Vector3(x, y, z)
  }

  function createGlobe() {
    globe = new THREE.Group()
    scene.add(globe)

    const loader = new THREE.TextureLoader()
    const earthTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')
    const earthBumpMap = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg')
    const earthSpecularMap = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg')
    
    const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 128, 128)
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.05,
      specularMap: earthSpecularMap,
      specular: new THREE.Color('grey'),
      shininess: 10
    })
    
    const earthMesh = new THREE.Mesh(geometry, material)
    globe.add(earthMesh)

    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.1, 128, 128)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    globe.add(atmosphere)

    const cloudGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.03, 64, 64)
    const cloudTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png')
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    globe.add(cloudMesh)
  }

  function createCityPoints() {
    const cities = [
      { lat: 40.7128, lng: -74.0060, intensity: 1, name: 'New York' },
      { lat: 51.5074, lng: -0.1278, intensity: 0.9, name: 'London' },
      { lat: 35.6762, lng: 139.6503, intensity: 1, name: 'Tokyo' },
      { lat: 48.8566, lng: 2.3522, intensity: 0.8, name: 'Paris' },
      { lat: 37.5665, lng: 126.9780, intensity: 0.9, name: 'Seoul' },
      { lat: -33.8688, lng: 151.2093, intensity: 0.7, name: 'Sydney' },
      { lat: 1.3521, lng: 103.8198, intensity: 0.8, name: 'Singapore' },
      { lat: 37.7749, lng: -122.4194, intensity: 0.9, name: 'San Francisco' },
      { lat: 52.5200, lng: 13.4050, intensity: 0.7, name: 'Berlin' },
      { lat: 55.7558, lng: 37.6173, intensity: 0.8, name: 'Moscow' },
      { lat: 19.4326, lng: -99.1332, intensity: 0.7, name: 'Mexico City' },
      { lat: -23.5505, lng: -46.6333, intensity: 0.8, name: 'São Paulo' },
      { lat: 31.2304, lng: 121.4737, intensity: 0.9, name: 'Shanghai' },
      { lat: 28.6139, lng: 77.2090, intensity: 0.8, name: 'New Delhi' },
      { lat: 25.2048, lng: 55.2708, intensity: 0.7, name: 'Dubai' },
    ]

    cities.forEach(city => {
      const point = {
        position: latLngToVector3(city.lat, city.lng, GLOBE_RADIUS),
        lat: city.lat,
        lng: city.lng,
        intensity: city.intensity,
        name: city.name
      }
      cityPoints.push(point)

      const geometry = new THREE.SphereGeometry(0.03, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.1 + city.intensity * 0.1, 1, 0.5 + city.intensity * 0.3),
        transparent: true,
        opacity: 0
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.copy(point.position.clone().normalize().multiplyScalar(GLOBE_RADIUS * 1.01))
      mesh.userData = { cityPoint: point }
      point.mesh = mesh
      globe.add(mesh)
    })

    for (let i = 0; i < CITY_COUNT - cities.length; i++) {
      const lat = (Math.random() - 0.5) * 180
      const lng = (Math.random() - 0.5) * 360
      cityPoints.push({
        position: latLngToVector3(lat, lng, GLOBE_RADIUS),
        lat,
        lng,
        intensity: Math.random() * 0.5 + 0.2
      })
    }

    const pointGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(cityPoints.length * 3)
    const colors = new Float32Array(cityPoints.length * 3)
    const sizes = new Float32Array(cityPoints.length)

    cityPoints.forEach((point, i) => {
      positions[i * 3] = point.position.x
      positions[i * 3 + 1] = point.position.y
      positions[i * 3 + 2] = point.position.z

      const color = new THREE.Color()
      color.setHSL(0.1 + point.intensity * 0.1, 1, 0.5 + point.intensity * 0.3)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = 0.02 + point.intensity * 0.03
    })

    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    pointGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const pointMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 300.0 / -mvPosition.z * (1.0 + 0.3 * sin(time + position.x * 10.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          float opacity = 1.0 - smoothstep(0.0, 0.5, r);
          gl_FragColor = vec4(vColor, opacity);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    })

    const points = new THREE.Points(pointGeometry, pointMaterial)
    globe.add(points)
  }

  function createDataFlow() {
    if (activeFlows.length >= DATA_FLOW_COUNT) return

    const idx1 = Math.floor(Math.random() * cityPoints.length)
    const idx2 = Math.floor(Math.random() * cityPoints.length)
    if (idx1 === idx2) return

    const start = cityPoints[idx1].position.clone()
    const end = cityPoints[idx2].position.clone()
    
    const midPoint = start.clone().add(end).multiplyScalar(0.5)
    const distance = start.distanceTo(end)
    midPoint.normalize().multiplyScalar(GLOBE_RADIUS + 0.2 + distance * 0.1)

    const curve = new THREE.CatmullRomCurve3([
      start.clone().normalize().multiplyScalar(GLOBE_RADIUS * 1.01),
      midPoint,
      end.clone().normalize().multiplyScalar(GLOBE_RADIUS * 1.01)
    ])

    const particleCount = 10
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const opacities = new Float32Array(particleCount)
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00d4ff) },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 6.0 * opacity;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying float vOpacity;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          float opacity = vOpacity * (1.0 - smoothstep(0.1, 0.5, r));
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    dataFlows.add(particles)

    activeFlows.push({
      curve,
      progress: 0,
      speed: 0.5 + Math.random() * 0.5,
      particles
    })
  }

  function createAmbientParticles() {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const radius = GLOBE_RADIUS * (1.5 + Math.random() * 2)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const color = new THREE.Color()
      color.setHSL(0.6, 0.5, 0.5 + Math.random() * 0.3)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.1 + position.y * 0.1) * 0.1;
          pos.y += cos(time * 0.1 + position.x * 0.1) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (100.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          float opacity = 0.2 * (1.0 - smoothstep(0.0, 0.5, r));
          gl_FragColor = vec4(vColor, opacity);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)
  }

  function updateDataFlows() {
    const time = Date.now() * 0.001

    activeFlows = activeFlows.filter((flow) => {
      flow.progress += flow.speed * 0.01

      if (flow.progress > 1) {
        dataFlows.remove(flow.particles)
        flow.particles.geometry.dispose()
        ;(flow.particles.material as THREE.ShaderMaterial).dispose()
        return false
      }

      const positions = flow.particles.geometry.attributes.position.array as Float32Array
      const opacities = flow.particles.geometry.attributes.opacity.array as Float32Array

      for (let i = 0; i < 10; i++) {
        const t = (flow.progress - i * 0.02) % 1
        if (t < 0) continue

        const point = flow.curve.getPoint(t)
        positions[i * 3] = point.x
        positions[i * 3 + 1] = point.y
        positions[i * 3 + 2] = point.z

        opacities[i] = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1
      }

      flow.particles.geometry.attributes.position.needsUpdate = true
      flow.particles.geometry.attributes.opacity.needsUpdate = true
      ;(flow.particles.material as THREE.ShaderMaterial).uniforms.time.value = time

      return true
    })

    if (Math.random() < 0.1) {
      createDataFlow()
    }
  }

  function updateShaders(time: number) {
    scene.traverse((child) => {
      if (child instanceof THREE.Points && child.material instanceof THREE.ShaderMaterial) {
        if (child.material.uniforms.time) {
          child.material.uniforms.time.value = time
        }
      }
    })
  }

  function handleMouseMove(event: MouseEvent) {
    const rect = container.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(globe.children.filter(child => child.userData.cityPoint))

    if (intersects.length > 0) {
      const cityPoint = intersects[0].object.userData.cityPoint
      if (hoveredCity !== cityPoint) {
        if (hoveredCity && hoveredCity.mesh) {
          ;(hoveredCity.mesh.material as THREE.MeshBasicMaterial).opacity = 0
        }
        hoveredCity = cityPoint
        if (hoveredCity.mesh) {
          ;(hoveredCity.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8
        }
        container.style.cursor = 'pointer'
        
        if (tooltip && hoveredCity.name) {
          tooltip.textContent = hoveredCity.name
          tooltip.style.display = 'block'
          tooltip.style.left = `${event.clientX - rect.left}px`
          tooltip.style.top = `${event.clientY - rect.top - 30}px`
        }
      }
    } else {
      if (hoveredCity && hoveredCity.mesh) {
        ;(hoveredCity.mesh.material as THREE.MeshBasicMaterial).opacity = 0
      }
      hoveredCity = null
      container.style.cursor = 'grab'
      if (tooltip) {
        tooltip.style.display = 'none'
      }
    }
  }

  function handleClick(event: MouseEvent) {
    if (hoveredCity) {
      selectedCity = hoveredCity
      
      const targetPosition = selectedCity.position.clone().normalize().multiplyScalar(10)
      const duration = 1000
      const startPosition = camera.position.clone()
      const startTime = Date.now()

      function animateCamera() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress)
        camera.lookAt(0, 0, 0)
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera)
        }
      }
      
      animateCamera()
    }
  }

  function animate() {
    animationId = requestAnimationFrame(animate)

    const time = Date.now() * 0.001

    globe.rotation.y += 0.0005
    
    if (globe.children[2]) {
      globe.children[2].rotation.y += 0.0008
    }

    particles.rotation.y += 0.0002
    particles.rotation.x = Math.sin(time * 0.1) * 0.1

    updateDataFlows()
    updateShaders(time)

    controls.update()
    renderer.render(scene, camera)
  }

  function handleResize() {
    if (!container) return
    
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }

  onMount(() => {
    if (typeof window === 'undefined') return

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000011, 8, 20)

    camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 8)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    container.appendChild(renderer.domElement)

    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 8
    controls.maxDistance = 8
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    const ambientLight = new THREE.AmbientLight(0x222222, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x6688ff, 0.5)
    pointLight.position.set(-5, -3, -5)
    scene.add(pointLight)

    dataFlows = new THREE.Group()
    scene.add(dataFlows)

    createGlobe()
    createCityPoints()
    createAmbientParticles()

    animate()

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)
  })

  onDestroy(() => {
    if (typeof window === 'undefined') return
    
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (controls) {
      controls.dispose()
    }
    if (renderer) {
      renderer.dispose()
    }
    if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
    if (container) {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('click', handleClick)
    }
    window.removeEventListener('resize', handleResize)
  })
</script>

<div class="globe-container" bind:this={container}>
  <div class="tooltip" bind:this={tooltip}></div>
</div>

<style>
  .globe-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    cursor: grab;
  }

  .globe-container:active {
    cursor: grabbing;
  }

  .tooltip {
    position: absolute;
    background: rgba(0, 212, 255, 0.1);
    color: #00d4ff;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid rgba(0, 212, 255, 0.3);
    backdrop-filter: blur(10px);
    font-size: 14px;
    pointer-events: none;
    display: none;
    z-index: 10;
    white-space: nowrap;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
  }
</style>