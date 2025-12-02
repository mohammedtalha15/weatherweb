'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PhysicsParameters, WeatherOutput } from '@/lib/types';

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-white font-medium">Loading Globe...</p>
            </div>
        </Html>
    );
}

/**
 * Props for the Globe component.
 */
interface GlobeProps {
    /** Current physics parameters affecting the simulation */
    parameters: PhysicsParameters;
    /** Calculated weather output to visualize */
    weather: WeatherOutput;
}

/**
 * Internal Earth component that handles the 3D mesh, materials, and animations.
 * Uses custom shaders for atmospheric glow and dynamic scaling for clouds/atmosphere.
 */
function Earth({ parameters, weather }: GlobeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    // Auto-rotate
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0012;
        }
    });

    // Calculate visual properties based on physics
    const atmosphereScale = 1 + (parameters.pressure / 1013) * 0.08;
    const cloudOpacity = parameters.humidity / 250; // Softer clouds
    const cloudScale = 1.015 + (parameters.gravity < 1 ? (1 - parameters.gravity) * 0.03 : 0);

    // Sunlight intensity affects lighting
    const lightIntensity = parameters.sunlight * 1.5;

    // Temperature affects color (subtle)
    // Temperature affects color (subtle natural tones)
    const tempColor = new THREE.Color();
    if (weather.temperature < 0) {
        tempColor.setHex(0xE0F7FA); // Icy White
    } else if (weather.temperature < 15) {
        tempColor.setHex(0xA5D6A7); // Sage Green
    } else if (weather.temperature < 25) {
        tempColor.setHex(0x81C784); // Fresh Green
    } else if (weather.temperature < 35) {
        tempColor.setHex(0xFFCC80); // Warm Sand
    } else {
        tempColor.setHex(0xFFAB91); // Terracotta
    }

    return (
        <group>
            {/* Lighting - Warm Natural Sunlight */}
            <ambientLight intensity={0.8} color="#FFF8E1" /> {/* Warm ambient */}
            <directionalLight
                position={[5, 3, 5]}
                intensity={lightIntensity}
                color="#FFF3E0" // Warm sunlight
            />
            <pointLight position={[-3, -2, -3]} intensity={0.2} color="#E0F2F1" />

            {/* Earth - Natural Blue/Green */}
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#4DB6AC" // Teal-ish base
                    roughness={0.8} // More matte
                    metalness={0.0} // No metallic
                    emissive={tempColor}
                    emissiveIntensity={0.1}
                />
            </Sphere>

            {/* Clouds - Soft white cotton */}
            <Sphere ref={cloudsRef} args={[cloudScale, 64, 64]}>
                <meshStandardMaterial
                    color="#FFFFFF"
                    transparent
                    opacity={cloudOpacity * 0.9}
                    roughness={1}
                    metalness={0}
                />
            </Sphere>

            {/* Atmosphere - Soft warm glow */}
            <Sphere ref={atmosphereRef} args={[atmosphereScale, 64, 64]}>
                <meshBasicMaterial
                    color="#E0F7FA"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Atmosphere Glow - Very subtle */}
            <Sphere args={[atmosphereScale + 0.03, 64, 64]}>
                <shaderMaterial
                    transparent
                    side={THREE.BackSide}
                    vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
                    fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.3;
            }
          `}
                    uniforms={{
                        glowColor: { value: new THREE.Color(0xE0F7FA) }
                    }}
                />
            </Sphere>
        </group>
    );
}

/**
 * Main 3D Globe visualization component.
 * Renders an interactive Earth with dynamic atmosphere, clouds, and lighting
 * based on the physics simulation parameters.
 * 
 * Includes a Suspense boundary with a custom Loader for smooth loading.
 */
export default function Globe({ parameters, weather }: GlobeProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-sky-100 to-white relative overflow-hidden">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Earth parameters={parameters} weather={weather} />
                    <OrbitControls enableZoom={true} enablePan={false} minDistance={1.5} maxDistance={4} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>

            {/* Info Overlay */}
            <div className="absolute bottom-4 left-4 weather-card px-4 py-2 text-sm">
                <p className="text-gray-600">
                    🌍 Drag to rotate • Scroll to zoom
                </p>
            </div>
        </div>
    );
}
