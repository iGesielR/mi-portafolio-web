import Link from "next/link";
import type { ReactElement } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

type SocialItem = {
  icon: ReactElement;
  path: string;
  label: string;
};

const socials: SocialItem[] = [
  {
    icon: <FaGithub />,
    path: "https://github.com/iGesielR",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/cristian-gesiel-gonzalez-resendiz-2aa095289/",
    label: "LinkedIn",
  },
  {
    icon: <FaInstagram />,
    path: "https://www.instagram.com/criss_gnzlez/",
    label: "Instagram",
  },
  
];

type SocialProps = {
  containerStyles?: string;
  iconStyles?: string;
};

const Social = ({ containerStyles, iconStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={iconStyles}
          title={item.label}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
