'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
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
            cloudsRef.current.rotation.y += 0.0015;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.0005;
        }
    });

    // Calculate visual properties based on physics
    const atmosphereScale = 1 + (parameters.pressure / 1013) * 0.1;
    const cloudOpacity = parameters.humidity / 200;
    const cloudScale = 1.02 + (parameters.gravity < 1 ? (1 - parameters.gravity) * 0.05 : 0);

    // Sunlight intensity affects lighting
    const lightIntensity = parameters.sunlight * 2;

    // Temperature affects color
    const tempColor = useMemo(() => {
        if (weather.temperature < 0) return new THREE.Color(0x00D9FF); // Blue
        if (weather.temperature < 15) return new THREE.Color(0x4A90E2); // Light blue
        if (weather.temperature < 25) return new THREE.Color(0x50E3C2); // Cyan
        if (weather.temperature < 35) return new THREE.Color(0xF5A623); // Orange
        return new THREE.Color(0xFF006E); // Hot pink
    }, [weather.temperature]);

    return (
        <group>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 3, 5]} intensity={lightIntensity} color={tempColor} />
            <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00D9FF" />

            {/* Earth */}
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color="#1a4d2e"
                    roughness={0.8}
                    metalness={0.2}
                    emissive={tempColor}
                    emissiveIntensity={0.1}
                />
            </Sphere>

            {/* Clouds */}
            <Sphere ref={cloudsRef} args={[cloudScale, 64, 64]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={cloudOpacity}
                    roughness={1}
                    metalness={0}
                />
            </Sphere>

            {/* Atmosphere */}
            <Sphere ref={atmosphereRef} args={[atmosphereScale, 64, 64]}>
                <meshBasicMaterial
                    color="#00D9FF"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[atmosphereScale + 0.05, 64, 64]}>
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
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, 1.0) * intensity;
            }
          `}
                    uniforms={{
                        glowColor: { value: new THREE.Color(0x00D9FF) }
                    }}
                />
            </Sphere>

            {/* Storm particles (if high storm probability) */}
            {weather.stormProbability > 50 && (
                <StormParticles count={Math.floor(weather.stormProbability)} />
            )}
        </group>
    );
}

function StormParticles({ count }: { count: number }) {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 1.1 + Math.random() * 0.2;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#FFD700"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

export default function Globe({ parameters, weather }: GlobeProps) {
    return (
        <div className="w-full h-full min-h-[400px] relative">
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
            <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 text-sm">
                <p className="text-gray-300">
                    🌍 Drag to rotate • Scroll to zoom
                </p>
            </div>
        </div>
    );
}
