export type Tag = { id: number; name: string; path: string };

export type Project = {
  id: number;
  slug: string;
  href: string;
  logo: string;
  image: string;
  tags: Tag[];
};

export type Social = { name: string; href: string; icon: string };

// Sólo metadatos de los reviews, el texto se traduce por i18n
export type ReviewMeta = {
  key: string;
  img: string;
};

export const myProjects: Project[] = [
  {
    id: 1,
    slug: "quizly-platform",
    href: "https://quizz-app-kappa-plum.vercel.app/",
    logo: "",
    image: "/assets/projects/quizly.png",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "NodeJS", path: "/assets/logos/nodejs.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 5, name: "Vercel", path: "/assets/logos/vercel.svg" },
      { id: 6, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
    ],
  },
  {
    id: 2,
    slug: "puzzle-deslizante",
    href: "https://sliding-puzzle-game-jet.vercel.app/",
    logo: "",
    image: "/assets/projects/puzzle-deslizante.png",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "NodeJS", path: "/assets/logos/nodejs.svg" },
      { id: 3, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
      { id: 4, name: "ExpressJS", path: "/assets/logos/expressjs.svg" },
   ],
  },
  {
    id: 3,
    slug: "verbox",
    href: "https://verbox-rho.vercel.app/",
    logo: "",
    image: "/assets/projects/verbox.png",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "NodeJS", path: "/assets/logos/nodejs.svg" },
      { id: 3, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 4, name: "Css", path: "/assets/logos/css3.svg" },
      { id: 5, name: "HTML", path: "/assets/logos/html5.svg" },
      { id: 6, name: "Vercel", path: "/assets/logos/vercel.svg" },
    ],
  },
  {
    id: 4,
    slug: "memory-master",
    href: "https://verbox-rho.vercel.app/",
    logo: "",
    image: "/assets/projects/memorama.png",
    tags: [
      { id: 1, name: "NextJS", path: "/assets/logos/nextjs.svg" },
      { id: 2, name: "HTML", path: "/assets/logos/html5.svg" },
      { id: 3, name: "CSS", path: "/assets/logos/css3.svg" },
      { id: 4, name: "JavaScript", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 5,
    slug: "pendiente-ecommerce",
    href: "",
    logo: "",
    image: "/assets/projects/wordpress-theme.jpg",
    tags: [
      { id: 1, name: "NextJS", path: "/assets/logos/nextjs.svg" },
      { id: 2, name: "Gemini API", path: "/assets/logos/gemini.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },

];

export const mySocials: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/525542201790?text=Hola%20Cristian,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo.",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/cristian-gesiel-gonzalez-resendiz-2aa095289/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/criss_gnzlez/",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experienceKeys = [
  "pacifica",
  "elnumerouno",
  "grupoomer",
] as const;

export const reviews: ReviewMeta[] = [
  { key: "curiosidad", img: "/assets/tarjetas/curiosidad.svg" },
  { key: "evolucion", img: "/assets/tarjetas/evolucion.svg" },
  { key: "aprendizaje", img: "/assets/tarjetas/aprendizaje.svg" },
  { key: "resolucion", img: "/assets/tarjetas/resolucion.svg" },
  { key: "adaptabilidad", img: "/assets/tarjetas/adaptabilidad.png" },
  { key: "equipo", img: "/assets/tarjetas/equipo.svg" },
  { key: "constancia", img: "/assets/tarjetas/constancia.svg" },
  { key: "tecnologia", img: "/assets/tarjetas/tecnologia.svg" },
];
