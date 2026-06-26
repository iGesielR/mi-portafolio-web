"use client";

import { useTranslations } from "next-intl";
import { Timeline } from "@/components/Timeline";
import { experienceKeys } from "@/constants";

export type Experience = {
  title: string;
  job: string;
  date: string;
  contents: string[];
};

export default function Experiences() {
  const t = useTranslations("Experiences");
  const tItems = useTranslations("Experiences.items");

  const experiences: Experience[] = experienceKeys.map((key) => ({
    title: tItems(`${key}.title`),
    job: tItems(`${key}.job`),
    date: tItems(`${key}.date`),
    contents: tItems.raw(`${key}.contents`) as string[],
  }));

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: ID estable para anclaje (#experiences) y deep-link
    <section
      id="experiences"
      data-section="experiences"
      className="w-full c-space section-spacing scroll-mt-18"
      aria-label={t("aria_label")}
    >
      <h2 className="text-heading">{t("title")}</h2>
      <Timeline data={experiences} />
    </section>
  );
}
