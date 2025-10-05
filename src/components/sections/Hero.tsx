"use client";

import { useState, useEffect, useRef } from 'react';
import TrueFocus from '@/components/ui/TrueFocus';
import ProfileCard from '@/components/ui/ProfileCard';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

declare global {
    interface Window {
        VANTA: any;
    }
}

export const Hero = ({ isMounted }: { isMounted: boolean }) => {
    const { t } = useLanguage();
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    
    const vantaRef = useRef(null);
    
    useEffect(() => {
        if (window.VANTA && !vantaEffect) {
            setVantaEffect(window.VANTA.NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 0.7, // PERBAIKAN: Mengurangi kepadatan di mobile
                color: 0x64ffda,
                backgroundColor: 0xa192f,
                points: 12.00,
                maxDistance: 25.00,
                spacing: 18.00
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const one = <p 
        className={`font-mono text-accent transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} 
        style={{ transitionDelay: '800ms' }}
    >
        {t('heroGreeting') as string}
    </p>;
    
    const two = (
        // PERBAIKAN: Menambahkan margin atas untuk spasi
        <div 
            className={`transition-all duration-700 mt-4 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} 
            style={{ transitionDelay: '900ms' }}
        >
            <TrueFocus 
                sentence={t('heroName') as string}
                borderColor="#64ffda" 
                blurAmount={3} 
                animationDuration={0.8} 
                pauseBetweenAnimations={0.5} 
            />
        </div>
    );
    
    const three = <p 
        className={`max-w-xl text-slate text-base md:text-lg mt-6 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} 
        style={{ transitionDelay: '1100ms' }}
        dangerouslySetInnerHTML={{ __html: t('heroTagline') as string }}
    />;
    
    const four = (
        <motion.a 
            href="#projects" 
            className={`font-mono text-lg text-accent border border-accent rounded-lg px-8 py-4 mt-12 inline-block transition-all duration-700 relative overflow-hidden group ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`} 
            style={{ transitionDelay: '1200ms' }}
            whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(100, 255, 218, 0.5)",
                transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10">{t('heroButton') as string}</span>
            <span className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.a>
    );

    return (
        <section id="hero" className="relative min-h-screen">
            <div ref={vantaRef} className="absolute inset-0 z-0"></div>

            <div className="relative z-10 w-full container mx-auto px-4 sm:px-8 md:px-24">
                {/* PERBAIKAN: Menyesuaikan padding dan urutan untuk mobile */}
                <div className="flex flex-col md:flex-row items-center justify-center min-h-screen pt-24 pb-16 md:pt-0 md:pb-0 gap-12 md:gap-8">
                    
                    {/* ProfileCard di atas pada mobile */}
                    <div 
                        className={`relative flex items-center justify-center w-full max-w-sm md:w-1/2 order-1 md:order-2 transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`} 
                        style={{ transitionDelay: '1400ms' }}
                    >
                         <ProfileCard
                            avatarUrl="/eugene.jpg"
                            name="Mas Eugene"
                            title="AI Website Developer"
                            handle="@maseugene"
                            status="Build Future"
                            contactText="Hubungi Saya"
                            enableTilt={true}
                            enableMobileTilt={false}
                        />
                    </div>

                    {/* Teks di bawah pada mobile */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 order-2 md:order-1">
                         {one}
                         {two}
                         {three}
                         {four}
                    </div>

                </div>
            </div>
        </section>
    );
};

