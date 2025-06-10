"use client"

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import dynamic from "next/dynamic"
// import Logo from "@/components/Logo"

// Dynamically import Three.js components to avoid SSR issues
const CanvasComponent = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
const useFrameComponent = dynamic(() => import('@react-three/fiber').then(mod => mod.useFrame), { ssr: false })
const OrbitControlsComponent = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })

function GLBModel({ url, speed = 1 }: { url: string, speed?: number }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1.0)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // Calculate scale based on viewport width with smooth transitions
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
    
    const handleResize = () => {
      setScale(calculateScale())
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      setMounted(false)
    }
  }, [])

  useFrame((state, delta) => {
    if (modelRef.current && mounted) {
      modelRef.current.rotation.y += delta * speed
    }
  })

  // Apply highlight effect to all materials in the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            const originalMaterial = child.material;
            if (Array.isArray(originalMaterial)) {
              child.material = originalMaterial.map(mat => {
                const newMat = mat.clone();
                // Neutral emissive so color doesn't change
                newMat.emissive = new THREE.Color('#000000');
                newMat.emissiveIntensity = 0;
                newMat.metalness = hovered ? 0.8 : 0.5;
                newMat.roughness = hovered ? 0.2 : 0.5;
                return newMat;
              });
            } else {
              const newMat = originalMaterial.clone();
              // Neutral emissive so color doesn't change
              newMat.emissive = new THREE.Color('#000000');
              newMat.emissiveIntensity = 0;
              newMat.metalness = hovered ? 0.8 : 0.5;
              newMat.roughness = hovered ? 0.2 : 0.5;
              child.material = newMat;
            }
          }
        }
      });
    }
  }, [hovered, scene]);

  return (
    <group
      ref={modelRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? scale * 1.1 : scale}
      position={[0, 0, 0]} // Center the model
    >
      <primitive object={scene} />
    </group>
  )
}

function AnimatedSphere({ color = '#ffffff', speed = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { viewport } = useThree()
  const [scale, setScale] = useState(1.2)

  useEffect(() => {
    setMounted(true)
    // Calculate scale based on viewport width with smooth transitions
    const calculateScale = () => {
      const width = window.innerWidth
      // Smooth scaling from 1.0 to 1.3 based on viewport width
      const minScale = 1.0
      const maxScale = 1.3
      const minWidth = 320
      const maxWidth = 1024
      
      if (width <= minWidth) return minScale
      if (width >= maxWidth) return maxScale
      
      // Linear interpolation between min and max scale
      const progress = (width - minWidth) / (maxWidth - minWidth)
      return minScale + (maxScale - minScale) * progress
    }
    setScale(calculateScale())
    
    const handleResize = () => {
      setScale(calculateScale())
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      setMounted(false)
    }
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current && mounted) {
      meshRef.current.rotation.x += delta * speed
      meshRef.current.rotation.y += delta * speed * 0.5
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
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

interface CircularThreeSceneProps {
  color?: string
  speed?: number
  className?: string
  glbUrl?: string
  useModel?: boolean
}

export default function CircularThreeScene({ 
  color = '#ffffff', 
  speed = 1,
  className = '',
  glbUrl = '/models/myModel.glb',
  useModel = true
}: CircularThreeSceneProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [cameraPosition, setCameraPosition] = useState(3.5)

  useEffect(() => {
    setMounted(true)
    // Calculate camera position with smooth transitions
    const calculateCameraPosition = () => {
      const width = window.innerWidth
      // Smooth camera movement from 3.0 to 4.0 based on viewport width
      const minPosition = 3.0
      const maxPosition = 4.0
      const minWidth = 320
      const maxWidth = 1024
      
      if (width <= minWidth) return minPosition
      if (width >= maxWidth) return maxPosition
      
      // Linear interpolation between min and max position
      const progress = (width - minWidth) / (maxWidth - minWidth)
      return minPosition + (maxPosition - minPosition) * progress
    }
    setCameraPosition(calculateCameraPosition())
    
    const handleResize = () => {
      setCameraPosition(calculateCameraPosition())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, cameraPosition] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          {useModel && glbUrl ? (
            <GLBModel url={glbUrl} speed={speed} />
          ) : (
            <AnimatedSphere color={color} speed={speed} />
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