"use client";

import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import Alert from "@/components/Alert";
import { Particles } from "@/components/Particles";

type AlertType = "success" | "danger";

const EarthCanvas = dynamic(() => import("@/components/three/models/Earth"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full rounded-2xl border border-white/10 bg-primary/30" />
  ),
});

export default function Contact() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [alertMessage, setAlertMessage] = useState("");

  // IDs únicos
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const showAlertMessage = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setIsLoading(false);
      showAlertMessage("danger", t("errors.notConfigured"));
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: "Dark",
          from_email: formData.email,
          to_email: "deyvi132002@gmail.com",
          message: formData.message,
        },
        { publicKey }
      );

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", t("alerts.success"));
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      showAlertMessage("danger", t("alerts.genericError"));
    }
  };

  return (
    // biome-ignore lint/correctness/useUniqueElementIds: ID estable para anclaje (#contact) y deep-link
    <section
      className="relative flex items-center c-space section-spacing"
      id="contact"
      data-section="contact"
      aria-label={t("aria_label")}
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-white/10 bg-primary p-6">
            <div className="mb-10 flex w-full flex-col items-start gap-5">
              <h2 className="text-heading">{t("title")}</h2>
              <p className="font-normal text-neutral-400">{t("intro")}</p>
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor={nameId} className="field-label">
                  {t("fields.name.label")}
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  className="field-input field-input-focus"
                  placeholder={t("fields.name.placeholder")}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor={emailId} className="field-label">
                  {t("fields.email.label")}
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  className="field-input field-input-focus"
                  placeholder={t("fields.email.placeholder")}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor={messageId} className="field-label">
                  {t("fields.message.label")}
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={4}
                  className="field-input field-input-focus"
                  placeholder={t("fields.message.placeholder")}
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-radial from-lavender to-royal px-1 py-3 text-lg hover-animation text-center"
                disabled={isLoading}
              >
                {!isLoading ? t("cta.send") : t("cta.sending")}
              </button>
            </form>
          </div>
        </div>

        <div className="relative content-center">
          <div className="h-[360px] p-2 sm:h-[420px] md:h-[520px]">
            <EarthCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
