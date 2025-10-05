"use client";

import ShinyText from "@/components/ui/ShinyText";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MatrixSkills from "@/components/ui/MatrixSkills";
import { useLanguage } from "@/context/LanguageContext";

// PERBAIKAN: Definisikan tipe untuk setiap item dalam timeline
type TimelineItemData = {
    year: string;
    title: string;
    description: string;
};

const TimelineItem = ({ year, title, description, progress, range }: { year: string, title: string, description: string, progress: any, range: number[] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [50, 0]);

    return (
        <motion.div style={{ opacity, y }} className="mb-16">
            <span className="font-mono text-accent text-sm">{year}</span>
            <h4 className="font-bold text-slate-lightest mt-1 text-xl">{title}</h4>
            <p className="mt-2 text-sm text-slate">{description}</p>
        </motion.div>
    );
};

export const About = () => {
    const { t } = useLanguage();
    // PERBAIKAN: Terapkan tipe pada data yang diambil dari terjemahan
    const timelineData = t('timeline') as TimelineItemData[];

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start center', 'end end']
    });

    const techSkills = [
        "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS",
        "Three.js", "Python", "Hugging Face", "LangChain", "Node.js", "Firebase",
        "FastAPI", "Git", "GitHub", "Docker", "Vercel", "Google Cloud"
    ];

    return (
        <section
            id="about"
            ref={targetRef}
            className="relative py-24 overflow-hidden"
        >
             <div 
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(to right, var(--color-accent) 1px, var(--color-navy) 1px)`,
                  backgroundSize: '40px 40px',
                  animation: 'pan-overlay 20s linear infinite',
                }}
            />

            <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    <div className="md:sticky md:top-24 h-fit">
                        <h2 className="flex items-center text-3xl font-semibold font-syne text-slate-lightest mb-6">
                            <span className="text-accent font-mono text-2xl mr-3">01.</span>
                            {/* PERBAIKAN: Menambahkan 'as string' */}
                            <ShinyText text={t('aboutTitle') as string} speed={5} />
                        </h2>
                    </div>

                    <div className="md:col-span-2 relative">
                        <motion.div 
                            style={{ scaleY: scrollYProgress }}
                            className="absolute top-0 left-0 w-0.5 h-full bg-accent origin-top"
                        />
                        <div className="pl-8">
                            {timelineData.map((item, index) => {
                                const start = index / timelineData.length;
                                const end = start + 1 / timelineData.length;
                                return (
                                    <TimelineItem 
                                        key={index}
                                        year={item.year}
                                        title={item.title}
                                        description={item.description}
                                        progress={scrollYProgress}
                                        range={[start, end]}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    {/* PERBAIKAN: Menambahkan 'as string' */}
                    <h3 className="text-slate-lightest font-syne text-2xl mb-8">{t('skillsTitle') as string}</h3>
                    <div className="relative">
                       <MatrixSkills skills={techSkills} />
                    </div>
                </div>
            </div>
        </section>
    );
};

