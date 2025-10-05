"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    IconReact, IconNextJs, IconTypeScript, IconPython, 
    IconTensorFlow, IconPyTorch, IconNodeJs, IconDocker 
} from './Icons';

const skills = [
    { name: 'React', icon: <IconReact />, description: 'Membangun UI interaktif dan komponen yang dapat digunakan kembali.' },
    { name: 'Next.js', icon: <IconNextJs />, description: 'Framework React untuk aplikasi web modern dengan SSR dan SSG.' },
    { name: 'TypeScript', icon: <IconTypeScript />, description: 'Superset JavaScript untuk kode yang lebih aman dan skalabel.' },
    { name: 'Python', icon: <IconPython />, description: 'Bahasa utama untuk AI, machine learning, dan backend services.' },
    { name: 'TensorFlow', icon: <IconTensorFlow />, description: 'Platform end-to-end untuk machine learning dari Google.' },
    { name: 'PyTorch', icon: <IconPyTorch />, description: 'Library machine learning open-source berbasis Torch.' },
    { name: 'Node.js', icon: <IconNodeJs />, description: 'Runtime JavaScript untuk membangun backend yang cepat dan efisien.' },
    { name: 'Docker', icon: <IconDocker />, description: 'Platform kontainerisasi untuk deployment aplikasi yang konsisten.' },
];

const SkillMap = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
                {skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        className="relative flex items-center justify-center p-4 bg-light-navy rounded-lg cursor-pointer aspect-square"
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="w-1/2 h-1/2 text-slate">
                            {skill.icon}
                        </div>
                        <AnimatePresence>
                            {hoveredSkill === skill.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full mb-2 w-max max-w-xs p-2 text-center text-sm bg-navy text-slate-lightest rounded-md shadow-lg"
                                >
                                    <p className="font-bold text-accent">{skill.name}</p>
                                    <p className="text-xs">{skill.description}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillMap;
