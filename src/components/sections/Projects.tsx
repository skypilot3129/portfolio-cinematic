"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { IconExternalLink, IconYouTube, IconGitHub, IconChevronDown } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    link: string;
    videoLink: string;
};

export const Projects = () => {
    const { t } = useLanguage();
    const projectsData = t('projectsData') as Project[];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
    };

    return (
        <motion.section 
            id="projects" 
            className="relative py-24 min-h-screen flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="text-center mb-12 md:mb-16 px-4">
                <h2 className="flex items-center justify-center text-3xl font-semibold font-syne text-slate-lightest">
                    <span className="text-accent font-mono text-xl md:text-2xl mr-3">03.</span>
                    <ShinyText text={t('projectsTitle') as string} speed={5} />
                </h2>
                <p className="text-slate mt-4 max-w-2xl mx-auto">{t('projectsTagline') as string}</p>
            </div>

            <div className="relative w-full h-[550px] md:h-[500px]" style={{ perspective: '1000px' }}>
                <AnimatePresence initial={false}>
                    {projectsData.map((project, index) => {
                        const position = index - activeIndex;
                        const isCenter = position === 0;
                        const isOffScreen = Math.abs(position) > 1;
                        const isLeft = position < 0 && !isOffScreen;
                        const isRight = position > 0 && !isOffScreen;

                        let xOffset = position * 40; 
                        let scale = 1, zIndex = 0, opacity = 0, blur = 0;

                        if (isCenter) {
                            scale = 1; zIndex = 3; opacity = 1; blur = 0;
                        } else if (isLeft) {
                            scale = 0.8; zIndex = 2; opacity = 1; xOffset -= 10; blur = 4;
                        } else if (isRight) {
                            scale = 0.8; zIndex = 1; opacity = 1; xOffset += 10; blur = 4;
                        } else if (isOffScreen) {
                            opacity = 0; xOffset = position > 0 ? 100 : -100;
                        }
                        
                        return (
                            <motion.div
                                key={project.id}
                                initial={false}
                                animate={{ x: `${xOffset}%`, scale, opacity, zIndex, filter: `blur(${blur}px)` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                // PERBAIKAN: Ukuran kartu dibuat lebih besar dan tinggi di mobile
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[420px] h-auto aspect-[9/12] md:w-[550px] md:h-[450px] md:aspect-auto"
                            >
                                <div className="w-full h-full bg-light-navy/50 backdrop-blur-sm rounded-2xl border border-slate/20 shadow-2xl p-4 md:p-6 flex flex-col group/card">
                                    <div className="relative overflow-hidden rounded-lg w-full h-[45%] md:h-48">
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill
                                            sizes="(max-width: 768px) 90vw, 550px"
                                            className="object-cover transition-transform duration-300 group-hover/card:scale-105" 
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-lightest font-syne mt-4">{project.title}</h3>
                                    <p className="text-slate text-xs md:text-sm mt-2 flex-grow">{project.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <ul className="flex flex-wrap gap-2 text-xs font-mono">
                                            {project.tags.map((tag: string) => <li key={tag} className="bg-navy/50 text-accent px-2 py-1 rounded">{tag}</li>)}
                                        </ul>
                                        <div className="flex items-center gap-4 text-slate">
                                            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><IconGitHub /></a>
                                            <a href={project.link} target="_blank" rel="noreferrer" aria-label="Live Demo" className="hover:text-accent transition-colors"><IconExternalLink /></a>
                                            <a href={project.videoLink} target="_blank" rel="noreferrer" aria-label="Video Penjelasan" className="hover:text-accent transition-colors"><IconYouTube /></a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            {/* PERBAIKAN: Margin atas dikurangi agar tombol lebih dekat ke kartu */}
            <div className="mt-8 md:mt-8 flex gap-8">
                <button onClick={handlePrev} className="p-3 rounded-full bg-light-navy border border-slate/20 text-slate hover:text-accent hover:border-accent transition-colors">
                    <IconChevronDown className="w-6 h-6 rotate-90" />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full bg-light-navy border border-slate/20 text-slate hover:text-accent hover:border-accent transition-colors">
                    <IconChevronDown className="w-6 h-6 -rotate-90" />
                </button>
            </div>
        </motion.section>
    );
};

