"use client";

import { useTranslations } from "next-intl";
import CountUp from "react-countup";

const stats = [
  { id: "exp", number: 3 },
  { id: "projects", number: 5 },
  { id: "tech", number: 15 },
  { id: "commits", number: 600 },
];

const Stats = () => {
  const t = useTranslations("Stats");

  return (
    <div className="max-w-6xl mx-auto pb-5">
      <div
        className="
          grid
          grid-cols-2          
          md:grid-cols-4       
          gap-6
          max-w-[80vw] mx-auto xl:max-w-none
        "
      >
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center justify-center xl:justify-start"
          >
            <CountUp
              end={item.number}
              duration={5}
              delay={2}
              className="text-4xl xl:text-6xl font-extrabold"
            />
            <p
              className="
                max-w-[150px]
                leading-snug text-white/80
                text-sm sm:text-base
              "
            >
              {t(item.id)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
