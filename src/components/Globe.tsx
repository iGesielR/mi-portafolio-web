"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type GlobeMarker = { location: [number, number]; size: number };

interface GlobeRenderState {
	phi: number;
	theta: number;
	width: number;
	height: number;
}

interface GlobeConfig {
	width: number;
	height: number;
	onRender: (state: GlobeRenderState) => void;
	devicePixelRatio?: number;
	phi?: number;
	theta?: number;
	dark?: number;
	diffuse?: number;
	mapSamples?: number;
	mapBrightness?: number;
	baseColor?: [number, number, number];
	markerColor?: [number, number, number];
	glowColor?: [number, number, number];
	markers?: GlobeMarker[];
}

interface GlobeInstance {
	destroy: () => void;
}

type CreateGlobe = (
	canvas: HTMLCanvasElement,
	config: GlobeConfig,
) => GlobeInstance;
// ------------------------------------------------

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
	width: 800,
	height: 800,
	onRender: () => {},
	devicePixelRatio: 2,
	phi: 0,
	theta: 0.3,
	dark: 1,
	diffuse: 0.4,
	mapSamples: 16000,
	mapBrightness: 1.2,
	baseColor: [1, 1, 1] as [number, number, number],
	markerColor: [1, 1, 1] as [number, number, number],
	glowColor: [1, 1, 1] as [number, number, number],
	markers: [
		{ location: [14.5995, 120.9842], size: 0.03 },
		{ location: [19.076, 72.8777], size: 0.1 },
		{ location: [23.8103, 90.4125], size: 0.05 },
		{ location: [30.0444, 31.2357], size: 0.07 },
		{ location: [39.9042, 116.4074], size: 0.08 },
		{ location: [-23.5505, -46.6333], size: 0.1 },
		{ location: [19.4326, -99.1332], size: 0.1 },
		{ location: [40.7128, -74.006], size: 0.1 },
		{ location: [34.6937, 135.5022], size: 0.05 },
		{ location: [41.0082, 28.9784], size: 0.06 },
	] as GlobeMarker[],
} satisfies GlobeConfig;

type Props = {
	className?: string;
	config?: GlobeConfig;
};

export function Globe({ className, config = GLOBE_CONFIG }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const pointerInteracting = useRef<number | null>(null);

	const phiRef = useRef(0);
	const widthRef = useRef(0);

	const r = useMotionValue(0);
	const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

	const updatePointerInteraction = (value: number | null) => {
		pointerInteracting.current = value;
		if (canvasRef.current) {
			canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
		}
	};

	const updateMovement = (clientX: number) => {
		if (pointerInteracting.current !== null) {
			const delta = clientX - pointerInteracting.current;
			r.set(r.get() + delta / MOVEMENT_DAMPING);
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ro = new ResizeObserver((entries) => {
			for (const entry of entries) {
				widthRef.current = entry.contentRect.width;
			}
		});
		ro.observe(canvas);
		widthRef.current = canvas.offsetWidth;

		const createGlobeTyped = createGlobe as unknown as CreateGlobe;

		const globe = createGlobeTyped(canvas, {
			...config,
			width: widthRef.current * 2,
			height: widthRef.current * 2,
			onRender: (state: GlobeRenderState) => {
				if (!pointerInteracting.current) phiRef.current += 0.005;
				state.phi = phiRef.current + rs.get();
				state.width = widthRef.current * 2;
				state.height = widthRef.current * 2;
			},
		});

		canvas.style.opacity = "1";

		return () => {
			globe.destroy();
			ro.disconnect();
		};
	}, [rs, config]);

	return (
		<div
			className={twMerge(
				"mx-auto aspect-[1/1] w-full max-w-[600px]",
				className,
			)}
		>
			<canvas
				ref={canvasRef}
				className={twMerge(
					"size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
				)}
				onPointerDown={(e) => updatePointerInteraction(e.clientX)}
				onPointerUp={() => updatePointerInteraction(null)}
				onPointerOut={() => updatePointerInteraction(null)}
				onPointerMove={(e) => updateMovement(e.clientX)}
				onTouchMove={(e) =>
					e.touches[0] && updateMovement(e.touches[0].clientX)
				}
			/>
		</div>
	);
}

