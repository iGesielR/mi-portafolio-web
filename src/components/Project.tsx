"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import type { Tag } from "@/constants";
import ProjectDetails from "./ProjectDetails";

type Props = {
  slug: string;
  href: string;
  image: string;
  tags: Tag[];
  setPreview: (url: string | null) => void;
};

export default function Project({
  slug,
  href,
  image,
  tags,
  setPreview,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();

  const t = useTranslations("Project");
  const tItems = useTranslations("Projects.items");

  const title = tItems(`${slug}.title`);
  const description = tItems(`${slug}.description`);
  const subDescription = tItems.raw(`${slug}.subDescription`) as string[];

  return (
    <>
      <section
        aria-labelledby={headingId}
        className="space-y-14 py-10 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onFocusCapture={() => setPreview(image)}
        onBlurCapture={() => setPreview(null)}
      >
        <div>
          <h3 id={headingId} className="text-2xl">
            {title}
          </h3>

          <ul className="mt-2 flex flex-wrap gap-5 text-sand">
            {tags.map((tag) => (
              <li key={tag.id}>
                <span className="whitespace-nowrap">{tag.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hover-animation flex cursor-pointer items-center gap-1"
          aria-haspopup="dialog"
          aria-controls={isOpen ? `${headingId}-details` : undefined}
        >
          {t("readMore")}
          <Image
            src="/assets/arrow-right.svg"
            alt={t("openAlt")}
            width={20}
            height={20}
            className="w-5"
          />
        </button>
      </section>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
