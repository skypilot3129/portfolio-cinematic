"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [displayText, setDisplayText] = useState("");
    const targetText = "MAS EUGENE";
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let iteration = 0;
        
        clearInterval(intervalRef.current!);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                targetText
                    .split("")
                    .map((_letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= targetText.length) {
                clearInterval(intervalRef.current!);
            }

            iteration += 1 / 3;
        }, 40);

        return () => clearInterval(intervalRef.current!);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <h1 className="text-4xl md:text-6xl font-syne font-bold text-accent whitespace-nowrap">
                {displayText}
            </h1>
        </motion.div>
    );
};

export default Preloader;

