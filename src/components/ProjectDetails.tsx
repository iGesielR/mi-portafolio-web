"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef } from "react";
import type { Tag } from "@/constants";

type Props = {
  title: string;
  description: string;
  subDescription: string[];
  image: string;
  tags: Tag[];
  href: string;
  closeModal: () => void;
};

export default function ProjectDetails({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}: Props) {
  const t = useTranslations("ProjectDetails");
  const titleId = useId();
  const descId = useId();
  const subIdPrefix = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-sm"
      role="presentation"
      aria-hidden={false}
    >
      <button
        type="button"
        onClick={closeModal}
        aria-label={t("overlayClose")}
        className="absolute inset-0 -z-10 cursor-default"
      />

      <motion.div
        ref={dialogRef}
        className="relative max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-5 top-5 rounded-sm bg-midnight p-2 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label={t("close")}
        >
          <Image
            src="/assets/close.svg"
            alt=""
            width={24}
            height={24}
            priority
          />
        </button>

        <Image
          src={image}
          alt={title}
          width={1280}
          height={720}
          className="w-full rounded-t-2xl object-cover"
          priority
        />

        <div className="p-5">
          <h5 id={titleId} className="mb-2 text-2xl font-bold text-white">
            {title}
          </h5>

          <p id={descId} className="mb-3 font-normal text-neutral-400">
            {description}
          </p>

          {subDescription.map((subDesc) => (
            <p
              key={`${subIdPrefix}-${subDesc}`}
              className="mb-3 font-normal text-neutral-400"
            >
              {subDesc}
            </p>
          ))}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <Image
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  width={40}
                  height={40}
                  className="size-8 rounded-lg hover-animation object-contain"
                />
              ))}
            </div>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-1 font-medium hover-animation"
                aria-label={t("viewProject")}
                title={t("viewProject")}
              >
                {t("viewProject")}
                <Image
                  src="/assets/arrow-up.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1 text-white"
                aria-disabled="true"
                title={t("viewProject")}
              >
                {t("viewProject")}
                <Image
                  src="/assets/arrow-up.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
