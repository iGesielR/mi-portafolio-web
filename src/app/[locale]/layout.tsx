/**
 * Portfolio - CrissCode
 */

import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Funnel_Display } from "next/font/google";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-funnel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crisscode-portfolio.vercel.app"),
  title: {
    default: "CrissGnz | Portfolio",
    template: "%s | CrissgNZ",
  },
  description:
    "Portfolio de Cristian G, Especialista en Soporte Tecnico y Apasionado por el Desarrollo Web.",
  openGraph: {
    title: "CrissGnz | Portfolio",
    description:
      "Portfolio de Cristian G, Especialista en Soporte Técnico y Apasionado por el Desarrollo Web.",
    url: "https://crisscode-portfolio.vercel.app/",
    siteName: "CrissCode",
    images: [
      {
        url: "/og-crisscode1.jpg",
        width: 1200,
        height: 630,
        alt: "CrissCode - Portfolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrissGnz | Portfolio",
    description:
      "Portfolio de Cristian G, Especialista en Soporte Técnico y Apasionado por el Desarrollo Web.",
    images: ["/og-crisscode1.jpg"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

type AppLocale = (typeof routing.locales)[number];

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!routing.locales.includes(rawLocale as AppLocale)) {
    notFound();
  }

  const locale = rawLocale as AppLocale;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${funnelDisplay.className} min-h-dvh bg-primary text-white antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
