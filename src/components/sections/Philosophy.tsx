"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { IconChevronDown } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext"; // Impor hook bahasa

export const Philosophy = () => {
    const { t } = useLanguage(); // Gunakan hook untuk mendapatkan fungsi terjemahan
    const philosophySteps = t('philosophySteps'); // Ambil data dari file terjemahan

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="philosophy" className="relative py-24 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 circuit-board-bg" />

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full"
            >
                <div className="relative z-10 text-center mb-16">
                    <h2 className="flex items-center justify-center text-3xl font-semibold font-syne text-slate-lightest">
                        <span className="text-accent font-mono text-xl md:text-2xl mr-3">02.</span>
                        <ShinyText text={t('philosophyTitle')} speed={5} />
                    </h2>
                    <p className="text-slate mt-4 max-w-2xl mx-auto px-4 md:px-0">{t('philosophyTagline')}</p>
                </div>

                <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-8 px-4 md:px-0">
                    <div className="hidden md:block relative w-1 bg-light-navy rounded-full">
                        <motion.div 
                            className="absolute top-0 left-0 w-full bg-accent rounded-full"
                            animate={{ height: openIndex !== null ? `${(openIndex + 1) * 25}%` : '0%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    </div>

                    <div className="flex-1">
                        {philosophySteps.map((step: any, index: number) => (
                            <div key={index} className="border-b border-slate/20 last:border-b-0">
                                <h3 
                                    className="flex justify-between items-center cursor-pointer py-6"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="font-mono text-slate-lightest">{step.number}. <span className="font-syne text-xl ml-2">{step.title}</span></span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <IconChevronDown className="w-5 h-5 text-accent" />
                                    </motion.div>
                                </h3>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-slate pb-6 pr-8">{step.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

