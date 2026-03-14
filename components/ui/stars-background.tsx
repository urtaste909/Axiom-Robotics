"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";

interface StarsBackgroundProps {
    factor?: number;
    speed?: number;
    starColor?: string;
}

export const StarsBackground = ({
    factor = 0.05,
    speed = 0.015,
    starColor = "#FFF",
}: Omit<StarsBackgroundProps, 'pointerEvents' | 'transition'>) => {
    const [stars, setStars] = useState<any[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateStars = (canvas: HTMLCanvasElement) => {
        const starCount = Math.floor((canvas.width * canvas.height * factor) / 40);
        const newStars = [];

        for (let i = 0; i < starCount; i++) {
            newStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 0.5 + 0.5,
                speed: (Math.random() * 0.5 + 0.2) * speed * 15,
            });
        }

        setStars(newStars);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateStars(canvas);
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, [factor, speed]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = starColor;
            ctx.fill();

            star.y -= star.speed;
            // Reset star position if it goes off screen
            if (star.y < 0) {
                star.y = canvas.height;
                star.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }, [stars, starColor, speed]);

    useEffect(() => {
        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none"
        />
    );
};
