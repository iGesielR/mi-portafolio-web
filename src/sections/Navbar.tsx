"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";

type LocaleCode = "es" | "en";

function Navigation() {
  const t = useTranslations("Navbar");
  return (
    <ul className="nav-ul flex items-center gap-6">
      <li className="nav-li">
        <a className="nav-link text-neutral-300" href="#home">
          {t("home")}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link text-neutral-300" href="#about">
          {t("about")}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link text-neutral-300" href="#work">
          {t("work")}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link text-neutral-300" href="#experiences">
          {t("experiences")}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link text-neutral-300" href="#contact">
          {t("contact")}
        </a>
      </li>
    </ul>
  );
}

function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const locales: ReadonlyArray<{
    code: LocaleCode;
    name: string;
    short: string;
    flag: string;
  }> = useMemo(
    () => [
      {
        code: "es",
        name: "Español",
        short: "ES",
        flag: "/assets/logos/es.png",
      },
      {
        code: "en",
        name: "English",
        short: "EN",
        flag: "/assets/logos/en.png",
      },
    ],
    []
  );

  const current =
    locales.find((l) => l.code === (locale as LocaleCode)) ?? locales[0];

  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const qs = typeof window !== "undefined" ? window.location.search : "";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md text-neutral-200 hover:text-white hover:bg-white/10 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Image
          src={current.flag}
          alt={`${current.name} flag`}
          width={18}
          height={18}
          className="rounded-full"
        />
        <span className="text-sm">{current.short}</span>
        <ChevronDown size={14} className="opacity-70" />
      </button>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.16 }}
          className="absolute right-0 mt-2 w-40 overflow-hidden border border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-xl rounded-none md:rounded-xl"
          role="listbox"
        >
          {locales.map((l) => {
            const basePath = pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
            const href = `${basePath}${qs}${hash}`;

            return (
              <li key={l.code}>
                <Link
                  href={href}
                  locale={l.code}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={l.flag}
                    alt={`${l.name} flag`}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  <span>{l.name}</span>
                </Link>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileNavId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 z-20"
      initial={false}
      animate={{ top: isMobile ? 0 : scrolled ? 0 : 16 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <motion.div
        className="backdrop-blur-lg bg-primary/40"
        style={{ width: "100%" }}
        initial={false}
        animate={{
          maxWidth: isMobile ? "100%" : scrolled ? "100%" : "80rem",
          borderRadius: isMobile ? "0rem" : scrolled ? "0rem" : "9999px",
          marginLeft: isMobile ? "0rem" : scrolled ? "0rem" : "auto",
          marginRight: isMobile ? "0rem" : scrolled ? "0rem" : "auto",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="c-space">
          <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center py-2">
            <div className="flex items-center gap-2 col-start-1">
              <Link href="/" className="flex items-center gap-2 text-white">
                <Image
                  src="/assets/logos/crisscode.png"
                  alt="CrissCode logo"
                  width={36}
                  height={36}
                  className="h-10 w-12"
                  priority
                />
                <span className="text-xl font-bold">CrissGnz</span>
              </Link>
            </div>

            <nav
              className="hidden md:flex justify-center col-start-2"
              aria-label="Primary"
            >
              <Navigation />
            </nav>

            <div className="ml-auto flex items-center col-start-3 gap-2">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="md:hidden ml-auto flex cursor-pointer text-neutral-200 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls={mobileNavId}
              >
                <Image
                  src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                  alt="Menu toggle icon"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  priority
                />
              </button>
            </div>
          </div>
        </div>

        {/* Panel móvil */}
        {isOpen && (
          <motion.div
            className="block md:hidden text-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ maxHeight: "100vh" }}
            transition={{ duration: 0.3 }}
          >
            <div className=" bg-primary/40 rounded-none">
              <nav
                id={mobileNavId}
                className="pb-3"
                aria-label="Primary mobile"
              >
                <Navigation />
              </nav>

              <div className="flex justify-center pb-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
