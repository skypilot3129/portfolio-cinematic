"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from "@/components/ui/ShinyText";
import Lanyard from "@/components/ui/Lanyard";
import { IconGitHub, IconInstagram, IconLinkedin } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

const ContactOverlay = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    const { t } = useLanguage();
    const [isReadyForCanvas, setIsReadyForCanvas] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReadyForCanvas(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setIsOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={handleBackdropClick}
        >
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-slate-lightest hover:text-accent transition-colors text-4xl z-10"
                aria-label="Tutup"
            >
                &times;
            </button>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
            >
                <div className="relative h-96 w-full max-w-sm mx-auto">
                    {isReadyForCanvas && <Lanyard position={[0, -2, 10]} />}
                </div>
                
                {/* PERBAIKAN: Menambahkan 'as string' */}
                <h3 className="font-syne text-3xl text-slate-lightest mt-4">{t('overlayTitle') as string}</h3>
                <a href="mailto:emailanda@contoh.com" className="font-mono text-accent mt-2 hover:underline">
                    emailanda@contoh.com
                </a>

                <div className="flex items-center gap-6 text-slate mt-8">
                    <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><IconGitHub /></a>
                    <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors"><IconInstagram /></a>
                    <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><IconLinkedin /></a>
                </div>
            </motion.div>
        </motion.div>
    );
};


export const Contact = () => {
    const { t } = useLanguage();
    const [isOverlayOpen, setOverlayOpen] = useState(false);

    return (
        <>
            <section
                id="contact"
                className="py-24 text-center min-h-[70vh] flex flex-col items-center justify-center"
            >
                <h2 className="flex items-center justify-center text-3xl font-semibold font-syne text-slate-lightest mb-4">
                    <span className="text-accent font-mono text-2xl mr-3">04.</span>
                    {/* PERBAIKAN: Menambahkan 'as string' */}
                    <ShinyText text={t('contactTitle') as string} speed={5} />
                </h2>
                {/* PERBAIKAN: Menambahkan 'as string' */}
                <p className="text-slate max-w-xl mx-auto mb-8">{t('contactTagline') as string}</p>
                
                <motion.button 
                    onClick={() => setOverlayOpen(true)}
                    className="font-mono text-lg text-accent border border-accent rounded-lg px-8 py-4 mt-8 inline-block relative overflow-hidden group" 
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0px 0px 20px rgba(100, 255, 218, 0.5)",
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* PERBAIKAN: Menambahkan 'as string' */}
                    <span className="relative z-10">{t('contactButton') as string}</span>
                    <span className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
            </section>

            <AnimatePresence>
                {isOverlayOpen && <ContactOverlay setIsOpen={setOverlayOpen} />}
            </AnimatePresence>
        </>
    );
};

