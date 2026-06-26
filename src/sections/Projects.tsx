"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Project from "@/components/Project";
import { myProjects } from "@/constants";

export default function Projects() {
  const t = useTranslations("Projects");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: ID estable para anclaje (#work) y deep-link
    <section
      id="work"
      data-section="work"
      aria-label={t("aria_label")}
      className="relative c-space section-spacing scroll-mt-22"
    >
      <h2 className="text-heading">{t("title")}</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}

      {preview && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50 rounded-lg shadow-lg"
          style={{ x: springX, y: springY }}
          aria-hidden
        >
          <Image
            src={preview}
            alt={t("preview_alt")}
            width={320}
            height={224}
            className="h-48 w-80 rounded-lg object-cover"
            priority
          />
        </motion.div>
      )}
    </section>
  );
}
