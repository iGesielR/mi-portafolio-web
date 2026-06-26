"use client";
import type React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	reverse?: boolean;
	pauseOnHover?: boolean;
	vertical?: boolean;
	repeat?: number;
	children: React.ReactNode;
};

export default function Marquee({
	className,
	reverse = false,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	...props
}: Props) {
	return (
		<div
			{...props}
			className={twMerge(
				`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ${
					vertical ? "flex-col" : "flex-row"
				}`,
				className,
			)}
		>
			{Array.from({ length: repeat }).map(() => (
				<div
					key={crypto.randomUUID()}
					className={twMerge(
						"flex shrink-0 justify-around [gap:var(--gap)]",
						vertical
							? "animate-marquee-vertical flex-col"
							: "animate-marquee flex-row",
						pauseOnHover && "group-hover:[animation-play-state:paused]",
						reverse && "[animation-direction:reverse]",
					)}
				>
					{children}
				</div>
			))}
		</div>
	);
}
