'use client';

import { useEffect, useRef } from 'react';

export default function CloudBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Cloud class
        class Cloud {
            x: number;
            y: number;
            width: number;
            height: number;
            speedX: number;
            opacity: number;
            canvasWidth: number;
            canvasHeight: number;

            constructor(width: number, height: number) {
                this.canvasWidth = width;
                this.canvasHeight = height;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.width = Math.random() * 200 + 100; // 100-300px wide
                this.height = this.width * 0.6; // Maintain aspect ratio
                this.speedX = Math.random() * 0.3 + 0.1; // Very slow drift
                this.opacity = Math.random() * 0.05 + 0.03; // 3-8% opacity
            }

            update() {
                this.x += this.speedX;

                // Wrap around screen
                if (this.x > this.canvasWidth + this.width) {
                    this.x = -this.width;
                }
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.globalAlpha = this.opacity;

                // Draw soft cloud shape using multiple circles
                ctx.fillStyle = '#ffffff';

                const centerX = this.x;
                const centerY = this.y;
                const radius = this.width / 6;

                // Create cloud with overlapping circles
                for (let i = 0; i < 5; i++) {
                    const offsetX = (i - 2) * (radius * 0.8);
                    const offsetY = Math.sin(i) * (radius * 0.3);
                    const circleRadius = radius * (0.8 + Math.random() * 0.4);

                    ctx.beginPath();
                    ctx.arc(
                        centerX + offsetX,
                        centerY + offsetY,
                        circleRadius,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Create clouds
        const cloudCount = 8;
        const clouds: Cloud[] = [];
        for (let i = 0; i < cloudCount; i++) {
            clouds.push(new Cloud(canvas.width, canvas.height));
        }

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            // Clear with transparent background
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            clouds.forEach((cloud) => {
                cloud.update();
                cloud.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="cloud-bg"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
}
