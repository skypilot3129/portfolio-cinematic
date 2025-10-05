"use client";

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

// Definisikan relasi antar keahlian di sini
const skillRelations: { [key: string]: string[] } = {
    "React": ["Next.js", "JavaScript", "TypeScript", "Three.js"],
    "Next.js": ["React", "Vercel", "TypeScript"],
    "Python": ["FastAPI", "Hugging Face", "LangChain"],
    "Docker": ["Vercel", "Google Cloud", "Node.js"],
    "TailwindCSS": ["React", "Next.js"],
    "Firebase": ["Next.js", "React", "Node.js"]
};

// Komponen untuk setiap kata keahlian
const SkillWord = ({ word, activeWord }: { word: string, activeWord: string | null }) => {
    const isHovered = activeWord === word;
    // Cek apakah kata ini berhubungan dengan kata yang sedang di-hover
    const isRelated = activeWord && (skillRelations[activeWord]?.includes(word) || Object.values(skillRelations).some(v => v.includes(activeWord) && v.includes(word)));

    let color = "rgba(136, 146, 176, 0.4)"; // default slate/40
    let textShadow = 'none';
    let scale = 1;

    if (isHovered) {
        color = '#64ffda'; // accent
        textShadow = '0 0 10px #64ffda';
        scale = 1.1;
    } else if (isRelated) {
        color = 'rgba(100, 255, 218, 0.5)'; // accent/50
        textShadow = '0 0 5px rgba(100, 255, 218, 0.5)';
        scale = 1.05;
    }

    return (
        <motion.span
            className="transition-colors duration-300 py-1 cursor-default"
            animate={{ color, textShadow, scale }}
        >
            {word}
        </motion.span>
    );
};

// Komponen untuk setiap kolom yang mengalir
const MatrixColumn = ({ skills, duration, activeWord, setActiveWord }: { skills: string[], duration: number, activeWord: string | null, setActiveWord: (word: string | null) => void }) => {
    return (
        <motion.div
            className="flex flex-col font-mono text-lg whitespace-nowrap"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {skills.map((skill, i) => (
                <div key={i} onMouseEnter={() => setActiveWord(skill)} onMouseLeave={() => setActiveWord(null)}>
                    <SkillWord word={skill} activeWord={activeWord} />
                </div>
            ))}
        </motion.div>
    );
};

// Komponen utama yang menampung semua kolom
export default function MatrixSkills({ skills }: { skills: string[] }) {
    const [activeWord, setActiveWord] = useState<string | null>(null);
    const numColumns = 15;

    const columns = useMemo(() => {
        const newColumns = [];
        for (let i = 0; i < numColumns; i++) {
            const shuffled = [...skills].sort(() => 0.5 - Math.random());
            const columnContent = Array(5).fill(shuffled).flat();
            newColumns.push(columnContent);
        }
        return newColumns;
    }, [skills]);
    
    return (
        <div className="relative w-full h-80 overflow-hidden bg-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]">
            <div className="absolute inset-0 flex justify-between px-4">
                {columns.map((colSkills, i) => (
                    <MatrixColumn 
                        key={i} 
                        skills={colSkills} 
                        duration={Math.random() * 20 + 20}
                        activeWord={activeWord}
                        setActiveWord={setActiveWord}
                    />
                ))}
            </div>
        </div>
    );
}

