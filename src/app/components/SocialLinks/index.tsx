import Link from "next/link"
import { FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6"

const iconComponents = {
  FaInstagram: FaInstagram,
  FaXTwitter: FaXTwitter,
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
}


type IconName = keyof typeof iconComponents


interface SocialLink {
  href: string;
  icon: IconName; 
  name: string;
}

const socials: SocialLink[] = [
  { href: 'https://instagram.com/airlanggga', icon: 'FaInstagram', name: 'Instagram' },
  { href: 'https://github.com/klob0t', icon: 'FaGithub', name: 'Github' },
  { href: 'https://linkedin.com/in/airlanggakb', icon: 'FaLinkedin', name: 'Linkedin' },
  { href: 'https://x.com/klob0t', icon: 'FaXTwitter', name: 'X' }, 
]

export default function SocialLinks() {
  return (
    <>
      {socials.map(link => {

        const IconComponent = iconComponents[link.icon];

        if (!IconComponent) {
          console.warn(`Icon component not found for: ${link.icon}`);
          return null;
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            aria-label={`Follow me on ${link.name}`}
          >
            <IconComponent />
          </Link>
        )
      })}
    </>
  )
}