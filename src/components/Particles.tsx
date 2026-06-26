"use client";

import type { FC, HTMLAttributes } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/* -------------------------- hooks & utils -------------------------- */

function useMousePosition() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });
	useEffect(() => {
		const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);
	return mouse;
}

function hexToRgb(hex: string): [number, number, number] {
	let h = hex.replace("#", "");
	if (h.length === 3)
		h = h
			.split("")
			.map((c) => c + c)
			.join("");
	const n = parseInt(h, 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* ------------------------------ types ------------------------------ */

type Circle = {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
};

type Props = HTMLAttributes<HTMLDivElement> & {
	quantity?: number;
	staticity?: number;
	ease?: number;
	size?: number;
	refresh?: boolean;
	color?: string;
	vx?: number;
	vy?: number;
	className?: string;
};

/* ---------------------------- component ---------------------------- */

export const Particles: FC<Props> = ({
	className = "",
	quantity = 100,
	staticity = 50,
	ease = 50,
	size = 0.4,
	refresh = false,
	color = "#ffffff",
	vx = 0,
	vy = 0,
	...props
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<Circle[]>([]);
	const mousePos = useMousePosition();
	const mouse = useRef({ x: 0, y: 0 });
	const canvasSize = useRef({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
	const rafID = useRef<number | null>(null);
	const resizeTimeout = useRef<number | null>(null);

	const rgb = useMemo(() => hexToRgb(color), [color]);

	const remapValue = useCallback(
		(
			value: number,
			start1: number,
			end1: number,
			start2: number,
			end2: number,
		) => {
			const remapped =
				((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
			return remapped > 0 ? remapped : 0;
		},
		[],
	);

	const clearContext = useCallback(() => {
		if (!ctx.current) return;
		ctx.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
	}, []);

	const drawCircle = useCallback(
		(circle: Circle, update = false) => {
			if (!ctx.current) return;
			const { x, y, translateX, translateY, size: r, alpha } = circle;
			ctx.current.translate(translateX, translateY);
			ctx.current.beginPath();
			ctx.current.arc(x, y, r, 0, 2 * Math.PI);
			ctx.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
			ctx.current.fill();
			ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (!update) circles.current.push(circle);
		},
		[dpr, rgb],
	);

	const circleParams = useCallback((): Circle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const translateX = 0;
		const translateY = 0;
		const pSize = Math.floor(Math.random() * 2) + size;
		const alpha = 0;
		const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
		const dx = (Math.random() - 0.5) * 0.1;
		const dy = (Math.random() - 0.5) * 0.1;
		const magnetism = 0.1 + Math.random() * 4;
		return {
			x,
			y,
			translateX,
			translateY,
			size: pSize,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
		};
	}, [size]);

	const resizeCanvas = useCallback(() => {
		if (!containerRef.current || !canvasRef.current) return;

		const w = containerRef.current.offsetWidth;
		const h = containerRef.current.offsetHeight;
		canvasSize.current = { w, h };

		const canvas = canvasRef.current;
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;

		if (!ctx.current) ctx.current = canvas.getContext("2d");
		ctx.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

		circles.current = [];
		for (let i = 0; i < quantity; i++) drawCircle(circleParams());
	}, [dpr, drawCircle, quantity, circleParams]);

	const drawParticles = useCallback(() => {
		clearContext();
		circles.current = [];
		for (let i = 0; i < quantity; i++) drawCircle(circleParams());
	}, [clearContext, drawCircle, circleParams, quantity]);

	const onMouseMove = useCallback(() => {
		if (!canvasRef.current) return;
		const rect = canvasRef.current.getBoundingClientRect();
		const { w, h } = canvasSize.current;
		const x = mousePos.x - rect.left - w / 2;
		const y = mousePos.y - rect.top - h / 2;
		const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
		if (inside) {
			mouse.current.x = x;
			mouse.current.y = y;
		}
	}, [mousePos.x, mousePos.y]);

	useEffect(() => {
		onMouseMove();
	}, [onMouseMove]);

	const animate = useCallback(() => {
		clearContext();

		circles.current.forEach((circle, i) => {
			const edge = [
				circle.x + circle.translateX - circle.size,
				canvasSize.current.w - circle.x - circle.translateX - circle.size,
				circle.y + circle.translateY - circle.size,
				canvasSize.current.h - circle.y - circle.translateY - circle.size,
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);

			if (remapClosestEdge > 1) {
				circle.alpha += 0.02;
				if (circle.alpha > circle.targetAlpha)
					circle.alpha = circle.targetAlpha;
			} else {
				circle.alpha = circle.targetAlpha * remapClosestEdge;
			}

			circle.x += circle.dx + vx;
			circle.y += circle.dy + vy;

			circle.translateX +=
				(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
				ease;
			circle.translateY +=
				(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
				ease;

			drawCircle(circle, true);

			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.current.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.current.h + circle.size
			) {
				circles.current.splice(i, 1);
				drawCircle(circleParams());
			}
		});

		rafID.current = window.requestAnimationFrame(animate);
	}, [
		clearContext,
		drawCircle,
		remapValue,
		vx,
		vy,
		staticity,
		ease,
		circleParams,
	]);

	const startAnimation = useCallback(() => {
		if (rafID.current != null) cancelAnimationFrame(rafID.current);
		rafID.current = window.requestAnimationFrame(animate);
	}, [animate]);

	const initCanvas = useCallback(() => {
		resizeCanvas();
		drawParticles();
	}, [resizeCanvas, drawParticles]);

	const onResize = useCallback(() => {
		if (resizeTimeout.current) window.clearTimeout(resizeTimeout.current);
		resizeTimeout.current = window.setTimeout(() => {
			initCanvas();
		}, 200);
	}, [initCanvas]);

	/* mount / update */
	useEffect(() => {
		if (canvasRef.current && !ctx.current) {
			ctx.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		startAnimation();

		window.addEventListener("resize", onResize);
		return () => {
			if (rafID.current != null) cancelAnimationFrame(rafID.current);
			if (resizeTimeout.current != null)
				window.clearTimeout(resizeTimeout.current);
			window.removeEventListener("resize", onResize);
		};
	}, [initCanvas, startAnimation, onResize]);

	/* refresh trigger */
	useEffect(() => {
		if (refresh) initCanvas();
	}, [refresh, initCanvas]);

	return (
		<div
			className={twMerge("pointer-events-none", className)}
			ref={containerRef}
			aria-hidden="true"
			{...props}
		>
			<canvas ref={canvasRef} className="size-full" />
		</div>
	);
};
