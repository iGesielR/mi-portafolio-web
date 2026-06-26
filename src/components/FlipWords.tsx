"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = { words: string[]; duration?: number; className?: string };

export function FlipWords({ words, duration = 3000, className }: Props) {
	const [currentWord, setCurrentWord] = useState(words[0]);
	const [isAnimating, setIsAnimating] = useState(false);

	const idCounter = useRef(0);
	const genId = useCallback(() => `fw-${idCounter.current++}`, []);

	const startAnimation = useCallback(() => {
		const idx = words.indexOf(currentWord);
		const next = words[idx + 1] ?? words[0];
		setCurrentWord(next);
		setIsAnimating(true);
	}, [currentWord, words]);

	useEffect(() => {
		if (isAnimating) return;
		const t = setTimeout(startAnimation, duration);
		return () => clearTimeout(t);
	}, [isAnimating, duration, startAnimation]);

	const tokens = useMemo(() => {
		return currentWord.split(" ").map((w) => ({
			id: genId(),
			word: w,
			letters: [...w].map((ch) => ({ id: genId(), ch })),
		}));
	}, [currentWord, genId]);

	return (
		<AnimatePresence onExitComplete={() => setIsAnimating(false)}>
			<motion.div
				key={currentWord}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 100, damping: 10 }}
				exit={{
					opacity: 0,
					y: -40,
					x: 40,
					filter: "blur(8px)",
					scale: 2,
					position: "absolute",
				}}
				className={twMerge("relative z-10 inline-block text-left", className)}
			>
				{tokens.map((tok, wi) => (
					<motion.span
						key={tok.id}
						initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ delay: wi * 0.3, duration: 0.3 }}
						className="inline-block whitespace-nowrap"
					>
						{tok.letters.map((ltr, li) => (
							<motion.span
								key={ltr.id}
								initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
								animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								transition={{ delay: wi * 0.3 + li * 0.05, duration: 0.2 }}
								className="inline-block"
							>
								{ltr.ch}
							</motion.span>
						))}
						<span className="inline-block">&nbsp;</span>
					</motion.span>
				))}
			</motion.div>
		</AnimatePresence>
	);
}
