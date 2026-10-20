import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function PanoramaSky() {
  const texture = useTexture('/panorama.jpg')
  return (
    <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  )
}

function Cruz() {
  const [active, setActive] = useState(false)
  const shape = new THREE.Shape()
  const t = 0.3, s = 1
  shape.moveTo(-t, -s); shape.lineTo(-t, -t); shape.lineTo(-s, -t)
  shape.lineTo(-s, t);  shape.lineTo(-t, t);  shape.lineTo(-t, s)
  shape.lineTo(t, s);   shape.lineTo(t, t);   shape.lineTo(s, t)
  shape.lineTo(s, -t);  shape.lineTo(t, -t);  shape.lineTo(t, -s)
  shape.closePath()
  return (
    <mesh position={[0, 0, -5]} scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
      <extrudeGeometry args={[shape, { depth: 0.3, bevelEnabled: false }]} />
      <meshStandardMaterial color={active ? 'Green' : 'Green'} />
    </mesh>
  )
}

function Corazon() {
  const [active, setActive] = useState(false)
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0, 0.3, -0.5, 1, -1, 1)
  shape.bezierCurveTo(-2, 1, -2, -0.5, -2, -0.5)
  shape.bezierCurveTo(-2, -1.5, -1, -2, 0, -3)
  shape.bezierCurveTo(1, -2, 2, -1.5, 2, -0.5)
  shape.bezierCurveTo(2, -0.5, 2, 1, 1, 1)
  shape.bezierCurveTo(0.5, 1, 0, 0.3, 0, 0)
  return (
    <mesh position={[-5, 1, 0]} scale={active ? 0.75 : 0.5} rotation={[0, Math.PI / 2, 0]} onClick={() => setActive(!active)}>
      <extrudeGeometry args={[shape, { depth: 0.4, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1 }]} />
      <meshStandardMaterial color={active ? 'yellow' : 'tomato'} />
    </mesh>
  )
}

function Diamante() {
  const [active, setActive] = useState(false)
  return (
    <mesh position={[0, 5, 0]} scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
      <octahedronGeometry args={[0.9]} />
      <meshStandardMaterial color={active ? 'yellow' : 'limegreen'} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 0.1] }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <PanoramaSky />
        </Suspense>
        <Cruz />
        <Corazon />
        <Diamante />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
