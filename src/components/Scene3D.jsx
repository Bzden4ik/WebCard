import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GlowCube() {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.5
    // Glow pulse
    const intensity = 0.5 + Math.sin(t * 2) * 0.3
    meshRef.current.material.emissiveIntensity = intensity
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          emissive="#ff2d75"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere({ position, color, size = 0.5, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.5
    meshRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial
        color="#0a0a1a"
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.4}
        distort={0.3}
        speed={2}
      />
    </mesh>
  )
}

function Particles({ count = 200 }) {
  const points = useRef()

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    points.current.rotation.y = t * 0.02
    points.current.rotation.x = t * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff2d75" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#00d4ff" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.5}
          angle={0.3}
          penumbra={1}
          color="#7c3aed"
        />

        <GlowCube />
        <FloatingSphere position={[4, 2, -2]} color="#00d4ff" size={0.4} speed={0.8} />
        <FloatingSphere position={[-3, -1, -3]} color="#ff2d75" size={0.3} speed={1.2} />
        <FloatingSphere position={[3, -2, -1]} color="#7c3aed" size={0.35} speed={0.6} />
        <Particles count={300} />
      </Canvas>
    </div>
  )
}
