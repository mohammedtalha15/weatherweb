'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PhysicsParameters, WeatherOutput } from '@/lib/types';

interface GlobeProps {
    parameters: PhysicsParameters;
    weather: WeatherOutput;
}

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
    const tempColor = new THREE.Color();
    if (weather.temperature < 0) {
        tempColor.setHex(0x87CEEB); // Sky blue
    } else if (weather.temperature < 15) {
        tempColor.setHex(0x6BA3D8); // Light blue
    } else if (weather.temperature < 25) {
        tempColor.setHex(0x60A5FA); // Soft blue
    } else if (weather.temperature < 35) {
        tempColor.setHex(0xFBBF24); // Warm yellow
    } else {
        tempColor.setHex(0xF59E0B); // Orange
    }

    return (
        <group>
            {/* Lighting - Natural daylight */}
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[5, 3, 5]}
                intensity={lightIntensity}
                color="#ffffff"
            />
            <pointLight position={[-3, -2, -3]} intensity={0.3} color="#87CEEB" />

            {/* Earth - Light blue/green */}
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#4A90E2"
                    roughness={0.7}
                    metalness={0.1}
                    emissive={tempColor}
                    emissiveIntensity={0.05}
                />
            </Sphere>

            {/* Clouds - Soft white */}
            <Sphere ref={cloudsRef} args={[cloudScale, 64, 64]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={cloudOpacity}
                    roughness={1}
                    metalness={0}
                />
            </Sphere>

            {/* Atmosphere - Soft blue glow */}
            <Sphere ref={atmosphereRef} args={[atmosphereScale, 64, 64]}>
                <meshBasicMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.08}
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
              float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
              gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.4;
            }
          `}
                    uniforms={{
                        glowColor: { value: new THREE.Color(0x87CEEB) }
                    }}
                />
            </Sphere>
        </group>
    );
}

export default function Globe({ parameters, weather }: GlobeProps) {
    return (
        <div className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 to-white">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                className="bg-transparent"
            >
                <Earth parameters={parameters} weather={weather} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={2}
                    maxDistance={5}
                    autoRotate={false}
                />
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
