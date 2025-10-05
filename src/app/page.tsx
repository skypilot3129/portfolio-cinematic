"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BubbleMenu from '@/components/ui/BubbleMenu';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { EmailLink } from '@/components/layout/EmailLink';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Philosophy } from '@/components/sections/Philosophy';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import ScrollVelocity from '@/components/ui/ScrollVelocity';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Preloader from '@/components/ui/Preloader';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

// Komponen untuk tombol pengganti bahasa
const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const toggleLanguage = () => {
        setLanguage(language === 'id' ? 'en' : 'id');
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="font-mono text-xs border border-slate/50 rounded-full w-8 h-8 flex items-center justify-center text-slate hover:text-accent hover:border-accent transition-colors pointer-events-auto"
            aria-label="Toggle Language"
        >
            {language.toUpperCase()}
        </button>
    );
}

// Konten utama halaman
const HomeContent = () => {
    useSmoothScroll(); 
    
    const { t } = useLanguage(); // Gunakan hook untuk mendapatkan fungsi terjemahan
    const [isMounted, setIsMounted] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    // Gunakan fungsi 't' untuk mendapatkan teks navigasi
    const navItems = [
      { label: t('navAbout'), href: '#about', rotation: -8, hoverStyles: { bgColor: '#64ffda', textColor: '#0a192f' } },
      { label: t('navPhilosophy'), href: '#philosophy', rotation: 8, hoverStyles: { bgColor: '#64ffda', textColor: '#0a192f' } },
      { label: t('navProjects'), href: '#projects', rotation: -8, hoverStyles: { bgColor: '#64ffda', textColor: '#0a192f' } },
      { label: t('navContact'), href: '#contact', rotation: 8, hoverStyles: { bgColor: '#64ffda', textColor: '#0a192f' } },
      { label: t('navResume'), href: '/resume.pdf', rotation: -8, hoverStyles: { bgColor: '#64ffda', textColor: '#0a192f' } }
    ];

    return (
        <>
            <div className="relative z-50">
                <BubbleMenu
                    logo={<span className="font-bold text-lg text-accent">MAS EUGENE</span>}
                    items={navItems}
                    menuBg="#112240"
                    menuContentColor="#ccd6f6"
                    useFixedPosition={true}
                    onMenuClick={setIsNavOpen}
                    languageSwitcher={<LanguageSwitcher />}
                />
            </div>

            <div className={`relative z-10 transition-all duration-500 ${isNavOpen ? 'filter blur-md pointer-events-none' : ''}`}>
                <SocialLinks isMounted={isMounted} />
                <EmailLink isMounted={isMounted} />
                <main>
                    <Hero isMounted={isMounted} />
                    <div className="relative z-20 bg-navy">
                        <ScrollVelocity texts={["Eugene AI Web Dev", "Intelligent Web Solutions"]} velocity={-100} className="font-syne text-slate-lightest" />
                    </div>
                    <div className="container mx-auto px-8 sm:px-16 md:px-24">
                        <About />
                        <Philosophy />
                        <Projects />
                        <Contact />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

// Komponen utama yang membungkus seluruh halaman
const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LanguageProvider>
            <div className="bg-navy min-h-screen">
                <AnimatePresence>
                    {isLoading && <Preloader />}
                </AnimatePresence>
                {!isLoading && <HomeContent />}
            </div>
        </LanguageProvider>
    );
};

export default Home;

