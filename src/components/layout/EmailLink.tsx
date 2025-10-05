"use client";
import { motion } from 'framer-motion';

export const EmailLink = ({ isMounted }: { isMounted: boolean }) => {
    return (
        // PERBAIKAN: Tambahkan 'hidden md:flex' untuk menyembunyikan di mobile
        <motion.div
            className="hidden md:flex flex-col items-center fixed bottom-0 right-12 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMounted ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <a href="mailto:skypilot048@gmail.com" className="font-mono text-sm text-slate hover:text-accent transition-colors tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                skypilot048@gmail.com
            </a>
            <div className="w-px h-24 bg-slate mt-6"></div>
        </motion.div>
    );
};

