export const footerLinks = {
  Shop: [ "Women", "Men", "Babies", "Kids"],
  pages: ["Home", "Shop", "About", "Contact Us"]
};

export const socials = [
  {
    label: "Instagram",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#F5F5F5" strokeWidth={1.8}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="#F5F5F5" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#F5F5F5" strokeWidth={1.8}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#F5F5F5" strokeWidth={1.8}>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.09-2.37 3.09-5.18 0-2.14-1.44-3.74-4.04-3.74-2.94 0-4.77 2.2-4.77 4.64 0 .84.24 1.43.62 1.89.17.2.19.29.13.52-.04.17-.14.58-.18.74-.06.24-.24.33-.44.24-1.24-.51-1.82-1.87-1.82-3.4 0-2.52 2.12-5.55 6.33-5.55 3.39 0 5.63 2.44 5.63 5.07 0 3.47-1.93 6.08-4.76 6.08-1 0-1.95-.54-2.27-1.16l-.62 2.38c-.23.85-.67 1.7-1.02 2.36.77.24 1.58.37 2.42.37 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg width="18" height="18" fill="#F5F5F5" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
};