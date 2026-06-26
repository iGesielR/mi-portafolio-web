"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiDownload } from "react-icons/fi";
import { FlipWords } from "./FlipWords";
import Social from "./Social";

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function HeroText() {
  const t = useTranslations("HeroText");

  const words = t.raw("words") as string[];

  return (
    <div className="z-10 mt-20 text-center md:mt-45 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop */}
      <div className="hidden flex-col md:flex">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("title")}
        </motion.h1>

        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t("headingTop")} <br /> {t("headingBottom1")}
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t("headingBottom2")}
          </motion.p>
        </div>

        <p className="max-w-[500px] text-xl my-9 text-white/80">{t("pitch")}</p>

        <div className="flex flex-col xl:flex-row items-center gap-8">
          <a
            href="/CV_CRISTIAN_G.pdf"
            download
            aria-label={t("ariaDownload")}
            className="uppercase flex items-center gap-2 px-5 py-3 border border-white rounded-full cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300"
          >
            <span>{t("download")}</span>
            <FiDownload className="text-xl" />
          </a>
          <div className="mb-8 xl:mb-8 contents">
            <Social
              containerStyles="flex gap-6"
              iconStyles="w-9 h-9 border border-white rounded-full flex justify-center items-center text-white cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("title")}
        </motion.p>

        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t("headingTopMobile")}
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-6xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t("headingBottomMobile")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
