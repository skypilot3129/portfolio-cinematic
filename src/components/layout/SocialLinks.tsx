"use client";
import { motion } from 'framer-motion';
import { IconGitHub, IconInstagram, IconLinkedin, IconTiktok } from '@/components/ui/Icons'; // Impor IconTiktok

export const SocialLinks = ({ isMounted }: { isMounted: boolean }) => {
    const items = [
        { href: "https://github.com", icon: <IconGitHub />, ariaLabel: "GitHub" },
        { href: "https://instagram.com", icon: <IconInstagram />, ariaLabel: "Instagram" },
        { href: "https://linkedin.com", icon: <IconLinkedin />, ariaLabel: "LinkedIn" },
        { href: "https://tiktok.com", icon: <IconTiktok />, ariaLabel: "TikTok" }, // Tambahkan item TikTok
    ];

    return (
        <motion.div 
            className="hidden md:flex flex-col items-center fixed bottom-0 left-12 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMounted ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <ul className="flex flex-col items-center gap-6">
                {items.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.ariaLabel} className="text-slate hover:text-accent transition-colors hover:-translate-y-1 block">
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="w-px h-24 bg-slate mt-6"></div>
        </motion.div>
    );
};

