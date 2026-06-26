"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Experience } from "@/sections/Experiences";

type Props = { data: Experience[] };

export function Timeline({ data }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const update = () => setHeight(el.getBoundingClientRect().height);

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const itemKey = (item: Experience) =>
    `${item.date}-${item.title}-${item.job}`;

  return (
    <div ref={containerRef} className="relative pb-20">
      <div ref={ref} className="relative">
        {data.map((item) => (
          <div
            key={itemKey(item)}
            className="md:pt-40 md:gap-10 flex justify-start pt-10"
          >
            {/* left column  */}
            <div className="sticky top-40 z-40 flex max-w-xs md:w-full lg:max-w-sm flex-col items-center self-start md:flex-row">
              <div className="absolute -left-[15px] flex h-10 w-10 items-center justify-center rounded-full bg-midnight">
                <div className="h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800 p-2" />
              </div>
              <div className="hidden md:flex md:pl-20 flex-col gap-2 text-xl md:text-4xl font-bold text-neutral-300">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            {/* right column  */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="md:hidden block text-left text-2xl font-bold text-neutral-300 mb-4">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>
              {item.contents.map((content) => (
                <p
                  className="mb-3 font-normal text-neutral-400"
                  key={`${itemKey(item)}-${content}`}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* vertical line */}
        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-1 md:left-1 w-[2px] overflow-hidden
                     bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                     from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]
                     [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full
                       bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent
                       from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
}
