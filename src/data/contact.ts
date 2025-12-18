import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export const footerLinks = [
  { id: "privacy-policy", label: "Privacy Policy", href: "/privacy-policy" },
  {
    id: "terms-and-conditions",
    label: "Terms and Conditions",
    href: "/terms",
  },
  { id: "disclaimer", label: "Disclaimer", href: "/disclaimer" },
  { id: "legal", label: "Legal", href: "/legal" },
];

export const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
    bgClass: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    bgClass: "bg-pink-500 hover:bg-pink-600",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    bgClass: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com",
    icon: X,
    bgClass: "bg-gray-900 hover:bg-gray-800",
  },
];
