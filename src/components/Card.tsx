import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const MotionImage = motion(Image);

type Props = {
  style?: React.CSSProperties;
  text?: string;
  image?: string;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Card({ style, text, image, containerRef }: Props) {
  return image && !text ? (
    <MotionImage
      className="absolute w-15 cursor-grab"
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      alt=""
      width={200}
      height={200}
    />
  ) : (
    <motion.div
      className="
        absolute cursor-grab rounded-full bg-storm text-center font-extralight ring ring-gray-700
        w-32 px-2 py-2 text-xs leading-snug
        sm:w-40 sm:px-3 sm:py-3 sm:text-sm
        md:w-[13rem] md:px-4 md:py-4 md:text-lg
      "
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
}
