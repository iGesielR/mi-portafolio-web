"use client";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
	type: "success" | "danger";
	text: string;
};

export default function Alert({ type, text }: Props) {
	const alertVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.8 },
		visible: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: -50, scale: 0.8 },
	};

	return (
		<AnimatePresence>
			<motion.div
				className="fixed bottom-5 right-5 z-50 flex items-center justify-center"
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={alertVariants}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				role="status"
				aria-live="polite"
			>
				<div
					className={`flex items-center rounded-md p-5 lg:inline-flex lg:rounded-full leading-none text-indigo-100
            ${type === "danger" ? "bg-red-800" : "bg-royal"}`}
				>
					<p
						className={`mr-3 flex rounded-full px-2 py-1 text-xs font-semibold uppercase
              ${type === "danger" ? "bg-red-500" : "bg-lavender"}`}
					>
						{type === "danger" ? "Failed" : "Success"}
					</p>
					<p className="mr-2 text-left">{text}</p>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
