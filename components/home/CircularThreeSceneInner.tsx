"use client"

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Loading 3D Model...
        </div>
        <div className="w-32 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </Html>
  )
}

function GLBModel({ url, speed = 1, onPointerOver, onPointerOut, hovered }: { url: string, speed?: number, onPointerOver?: () => void, onPointerOut?: () => void, hovered?: boolean }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1.0)

  useEffect(() => {
    setMounted(true)
    const calculateScale = () => {
      const width = window.innerWidth
      const minScale = 0.8
      const maxScale = 1.2
      const minWidth = 320
      const maxWidth = 1024
      if (width <= minWidth) return minScale
      if (width >= maxWidth) return maxScale
      const progress = (width - minWidth) / (maxWidth - minWidth)
      return minScale + (maxScale - minScale) * progress
    }
    setScale(calculateScale())
    const handleResize = () => setScale(calculateScale())
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      setMounted(false)
    }
  }, [])

  useFrame((_state, delta) => {
    if (modelRef.current && mounted) {
      modelRef.current.rotation.y += delta * speed
    }
  })

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const originalMaterial = child.material
          if (Array.isArray(originalMaterial)) {
            child.material = originalMaterial.map(mat => {
              const newMat = mat.clone()
              newMat.emissive = new THREE.Color('#000000')
              newMat.emissiveIntensity = 0
              newMat.metalness = 0.5
              newMat.roughness = 0.5
              return newMat
            })
          } else {
            const newMat = originalMaterial.clone()
            newMat.emissive = new THREE.Color('#000000')
            newMat.emissiveIntensity = 0
            newMat.metalness = 0.5
            newMat.roughness = 0.5
            child.material = newMat
          }
        }
      })
    }
  }, [scene])

  return (
    <group
      ref={modelRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={hovered ? scale * 1.1 : scale}
      position={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

function AnimatedSphere({ color = '#ffffff', speed = 1, onPointerOver, onPointerOut, hovered }: { color?: string, speed?: number, onPointerOver?: () => void, onPointerOut?: () => void, hovered?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1.2)

  useEffect(() => {
    setMounted(true)
    const calculateScale = () => {
      const width = window.innerWidth
      const minScale = 1.0
      const maxScale = 1.3
      const minWidth = 320
      const maxWidth = 1024
      if (width <= minWidth) return minScale
      if (width >= maxWidth) return maxScale
      const progress = (width - minWidth) / (maxWidth - minWidth)
      return minScale + (maxScale - minScale) * progress
    }
    setScale(calculateScale())
    const handleResize = () => setScale(calculateScale())
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      setMounted(false)
    }
  }, [])

  useFrame((_state, delta) => {
    if (meshRef.current && mounted) {
      meshRef.current.rotation.x += delta * speed
      meshRef.current.rotation.y += delta * speed * 0.5
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={hovered ? scale * 1.1 : scale}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.2}
        wireframe={true}
      />
    </mesh>
  )
}

export interface CircularThreeSceneInnerProps {
  color?: string
  speed?: number
  className?: string
  glbUrl?: string
  useModel?: boolean
}

export default function CircularThreeSceneInner({
  color = '#ffffff',
  speed = 1,
  className = '',
  glbUrl = '/models/myModel.glb',
  useModel = true
}: CircularThreeSceneInnerProps) {
  const { theme } = useTheme()
  const [cameraPosition, setCameraPosition] = useState(3.5)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const calculateCameraPosition = () => {
      const width = window.innerWidth
      const minPosition = 3.0
      const maxPosition = 4.0
      const minWidth = 320
      const maxWidth = 1024
      if (width <= minWidth) return minPosition
      if (width >= maxWidth) return maxPosition
      const progress = (width - minWidth) / (maxWidth - minWidth)
      return minPosition + (maxPosition - minPosition) * progress
    }
    setCameraPosition(calculateCameraPosition())
    const handleResize = () => setCameraPosition(calculateCameraPosition())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`w-full h-full ${className} relative`}>
      <Canvas
        camera={{ position: [0, 0, cameraPosition] }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1.2} distance={20} decay={2} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} intensity={0.8} distance={20} decay={2} color="#ffffff" />
        <pointLight position={[0, 0, -8]} intensity={0.5} distance={15} decay={2} color="#ffffff" />
        <spotLight position={[0, 8, 5]} angle={0.6} penumbra={0.5} intensity={1.2} castShadow color="#ffffff" />
        <pointLight
          position={[5, -5, 5]}
          intensity={0.4}
          distance={15}
          decay={2}
          color={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
        />
        <Suspense fallback={<Loader />}>
          {useModel && glbUrl ? (
            <GLBModel url={glbUrl} speed={speed} hovered={hovered} />
          ) : (
            <AnimatedSphere color={color} speed={speed} hovered={hovered} />
          )}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
