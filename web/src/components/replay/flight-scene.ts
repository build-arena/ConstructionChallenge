import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export function createFlightScene(
  host: HTMLDivElement, samples: Float32Array, center: number[], radius: number,
  onTime: (time: number) => void, onEnd: () => void,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  host.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 100000)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.enableDamping = false // Static scenes render only on interaction, never an idle loop.
  controls.rotateSpeed = 0.65
  controls.zoomSpeed = 0.8
  const count = samples.length / 4
  const positions = new Float32Array(count * 3)
  const bounds = new THREE.Box3(new THREE.Vector3(-radius, -radius, -radius), new THREE.Vector3(radius, radius, radius))
  const point = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    point.set(samples[4 * i + 1] - center[0], samples[4 * i + 2] - center[1], samples[4 * i + 3] - center[2])
    point.toArray(positions, i * 3)
    bounds.expandByPoint(point)
  }
  const sphere = bounds.getBoundingSphere(new THREE.Sphere())
  const globe = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32),
    new THREE.MeshPhongMaterial({ color: 0x347db2, emissive: 0x092842, transparent: true, opacity: 0.24, depthWrite: false, shininess: 18 }))
  scene.add(globe, new THREE.HemisphereLight(0xc8eaff, 0x12213b, 2))
  const light = new THREE.DirectionalLight(0xc4e4ff, 2.5)
  light.position.set(-radius * 2, radius * 3, radius * 2)
  scene.add(light)
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x78b9d6, transparent: true, opacity: 0.13, depthWrite: false })
  const addRing = (points: THREE.Vector3[]) => scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), gridMaterial))
  for (const latitude of [-60, -30, 0, 30, 60]) {
    const angle = latitude * Math.PI / 180
    addRing(Array.from({ length: 96 }, (_, i) => {
      const a = i * Math.PI * 2 / 96
      return new THREE.Vector3(radius * Math.cos(angle) * Math.cos(a), radius * Math.sin(angle), radius * Math.cos(angle) * Math.sin(a))
    }))
  }
  for (let meridian = 0; meridian < 6; meridian++) {
    const longitude = meridian * Math.PI / 6
    addRing(Array.from({ length: 96 }, (_, i) => {
      const a = i * Math.PI * 2 / 96
      return new THREE.Vector3(radius * Math.cos(a) * Math.cos(longitude), radius * Math.sin(a), radius * Math.cos(a) * Math.sin(longitude))
    }))
  }
  const geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const fullPath = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x70cbe5, transparent: true, opacity: 0.42 }))
  const trailGeometry = geometry.clone()
  const trail = new THREE.Line(trailGeometry, new THREE.LineBasicMaterial({ color: 0xa7edff, transparent: true, opacity: 0.95 }))
  const marker = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffba64, transparent: true, depthTest: false, depthWrite: false }))
  marker.renderOrder = 10
  scene.add(fullPath, trail, marker)
  const start = samples[0], end = samples[samples.length - 4]
  let current = start, playing = false, rate = 12, frame = 0, disposed = false
  let visible = true, previous = 0, lastNotification = 0
  const positionAtTime = () => {
    let low = 0, high = count - 1
    while (low + 1 < high) {
      const mid = (low + high) >>> 1
      if (samples[mid * 4] <= current) low = mid
      else high = mid
    }
    const fraction = THREE.MathUtils.clamp((current - samples[low * 4]) / (samples[high * 4] - samples[low * 4]), 0, 1)
    for (let k = 0; k < 3; k++) point.setComponent(k, positions[low * 3 + k] + fraction * (positions[high * 3 + k] - positions[low * 3 + k]))
    marker.position.copy(point)
    trailGeometry.setDrawRange(0, current >= end ? count : low + 1)
  }
  function requestDraw() {
    if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw)
  }
  function draw(now: number) {
    frame = 0
    if (disposed || !visible || document.hidden) { previous = 0; return }
    if (playing) {
      if (previous) current = Math.min(end, current + Math.min((now - previous) / 1000, 0.1) * rate)
      previous = now
      if (now - lastNotification > 100 || current >= end) { onTime(current); lastNotification = now }
      if (current >= end) { playing = false; onEnd() }
    }
    positionAtTime()
    // Keep the position marker about seven CSS pixels wide at any camera zoom.
    marker.scale.setScalar(camera.position.distanceTo(marker.position) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 7 / Math.max(1, host.clientHeight))
    renderer.render(scene, camera)
    if (playing) requestDraw()
  }
  const resetView = () => {
    const vertical = THREE.MathUtils.degToRad(camera.fov / 2)
    const halfAngle = Math.min(vertical, Math.atan(Math.tan(vertical) * camera.aspect))
    const distance = sphere.radius / Math.sin(halfAngle) * 1.1
    camera.position.copy(sphere.center).add(new THREE.Vector3(1.55, 0.95, 1.65).normalize().multiplyScalar(distance))
    camera.near = Math.max(0.1, distance / 10000)
    camera.far = distance * 20
    camera.updateProjectionMatrix()
    controls.target.copy(sphere.center)
    controls.minDistance = radius * 0.75
    controls.maxDistance = distance * 4
    controls.update()
    requestDraw()
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height)
    camera.aspect = width / height
    resetView()
  })
  resize.observe(host)
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    previous = 0
    if (visible) requestDraw()
    else { cancelAnimationFrame(frame); frame = 0 }
  })
  visibility.observe(host)
  const documentVisibility = () => {
    previous = 0
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0 }
    else requestDraw()
  }
  document.addEventListener("visibilitychange", documentVisibility)
  controls.addEventListener("change", requestDraw)
  return {
    seek(time: number) { current = THREE.MathUtils.clamp(time, start, end); previous = 0; onTime(current); requestDraw() },
    play(value: boolean) { playing = value; if (playing && current >= end) current = start; previous = 0; requestDraw() },
    rate(value: number) { rate = value },
    resetView,
    rotate(horizontal: number, vertical: number) {
      const offset = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target))
      offset.theta += horizontal; offset.phi += vertical; offset.makeSafe()
      camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(offset)); controls.update(); requestDraw()
    },
    zoom(scale: number) {
      const offset = camera.position.clone().sub(controls.target)
      offset.setLength(THREE.MathUtils.clamp(offset.length() * scale, controls.minDistance, controls.maxDistance))
      camera.position.copy(controls.target).add(offset); controls.update(); requestDraw()
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resize.disconnect(); visibility.disconnect()
      document.removeEventListener("visibilitychange", documentVisibility)
      controls.dispose()
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>()
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry)
          for (const m of Array.isArray(object.material) ? object.material : [object.material]) materials.add(m)
        }
      })
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose())
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
    },
  }
}
