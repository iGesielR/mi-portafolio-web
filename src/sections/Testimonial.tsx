"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

import Marquee from "@/components/Marquee";
import { reviews } from "@/constants";

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) {
  const t = useTranslations("Filosofia");
  return (
    <figure
      className={twMerge(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="bg-white/10 rounded-full"
          width={32}
          height={32}
          src={img}
          alt={t("avatarAlt", { name })}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
}

export default function Filosofia() {
  const sectionId = useId();
  const t = useTranslations("Filosofia");
  const tItems = useTranslations("Filosofia.items");

  return (
    <section
      id={`${sectionId}-testimonials`}
      data-section="testimonials"
      className="c-space mt-25 md:mt-35"
      aria-label={t("aria_label")}
    >
      <h2 className="text-heading">{t("title")}</h2>

      <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => {
            const name = tItems(`${review.key}.name`);
            const username = tItems(`${review.key}.username`);
            const body = tItems(`${review.key}.body`);

            return (
              <ReviewCard
                key={review.key}
                img={review.img}
                name={name}
                username={username}
                body={body}
              />
            );
          })}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => {
            const name = tItems(`${review.key}.name`);
            const username = tItems(`${review.key}.username`);
            const body = tItems(`${review.key}.body`);

            return (
              <ReviewCard
                key={review.key}
                img={review.img}
                name={name}
                username={username}
                body={body}
              />
            );
          })}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary" />
      </div>
    </section>
  );
}
