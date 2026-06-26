"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	reverse?: boolean;
	duration?: number;
	radius?: number;
	path?: boolean;
	iconSize?: number;
	speed?: number;
	pathColor?: string; // tailwind color class opcional
	pathWidth?: number; // grosor del anillo en px
};

export function OrbitingCircles({
	className,
	children,
	reverse = false,
	duration = 20,
	radius = 160,
	path = true,
	iconSize = 30,
	speed = 1,
	pathColor,
	pathWidth = 2,
	...props
}: Props) {
	const calculatedDuration = duration / speed;
	const items = React.Children.toArray(children);
	const count = items.length || 1;

	return (
		<div className={twMerge("relative", className)} {...props}>
			{path && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
					className="pointer-events-none absolute inset-0 size-full"
				>
					<circle
						cx="50%"
						cy="50%"
						r={radius}
						fill="none"
						strokeWidth={pathWidth}
						vectorEffect="non-scaling-stroke"
						className={twMerge(pathColor ?? "stroke-white/20")}
					/>
				</svg>
			)}

			{items.map((child, index) => {
				const angle = (360 / count) * index;
				return (
					<div
						key={(child as React.ReactElement).key ?? `orbit-${index}`}
						style={
							{
								"--duration": calculatedDuration,
								"--radius": radius,
								"--angle": angle,
								"--icon-size": `${iconSize}px`,
							} as React.CSSProperties
						}
						className={twMerge(
							"absolute flex size-[var(--icon-size)] items-center justify-center rounded-full transform-gpu animate-orbit",
							reverse && "[animation-direction:reverse]",
						)}
					>
						{child}
					</div>
				);
			})}
		</div>
	);
}
