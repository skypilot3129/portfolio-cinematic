"use client";

import { IconGitHub, IconInstagram, IconLinkedin, IconTiktok } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext'; // Impor hook bahasa

export const Footer = () => {
    const { t } = useLanguage(); // Gunakan hook untuk mendapatkan fungsi terjemahan

    const socialItems = [
        { href: "https://github.com", icon: <IconGitHub />, ariaLabel: "GitHub" },
        { href: "https://instagram.com", icon: <IconInstagram />, ariaLabel: "Instagram" },
        { href: "https://linkedin.com", icon: <IconLinkedin />, ariaLabel: "LinkedIn" },
        { href: "https://tiktok.com", icon: <IconTiktok />, ariaLabel: "TikTok" },
    ];

    return (
        <footer className="w-full text-center py-8">
            {/* Tautan sosial hanya untuk mobile */}
            <ul className="flex md:hidden items-center justify-center gap-6 mb-4">
                {socialItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.ariaLabel} className="text-slate hover:text-accent transition-colors">
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
            {/* Menggunakan fungsi 't' untuk teks */}
            <p className="font-mono text-sm text-slate">{t('footerBuiltBy')}</p>
            <p className="font-mono text-xs text-slate/50 mt-1">{t('footerInspired')}</p>
        </footer>
    );
};

