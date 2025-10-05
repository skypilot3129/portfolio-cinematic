"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// PERBAIKAN: Copywriting diubah menjadi lebih story telling
const timelineData = [
    {
        year: '2020',
        title: 'Percikan Awal: Dari Kode Menjadi Kehidupan',
        description: 'Perjalanan saya tidak dimulai di ruang kelas, tetapi dari rasa penasaran murni. Saat baris kode pertama saya berubah menjadi blog yang hidup, saya menyadari kekuatan untuk menciptakan dunia digital dari nol. Itulah momen di mana saya jatuh cinta pada pengembangan web.',
    },
    {
        year: '2022',
        title: 'Titik Balik: Web yang Berpikir',
        description: "Saya mulai melihat batasan dari web yang 'diam'. Saya bertanya, 'Bagaimana jika sebuah website bisa mengerti, bukan hanya menampilkan?' Pertanyaan itu membawa saya ke dunia AI, di mana saya menemukan cara untuk memberikan 'otak' pada aplikasi yang saya bangun.",
    },
    {
        year: 'Saat Ini',
        title: 'Misi Saya: Rekayasa Pengalaman Cerdas',
        description: 'Sekarang, misi saya jelas: merekayasa pengalaman digital yang terasa personal dan cerdas. Saya menggabungkan desain yang berpusat pada manusia dengan kekuatan machine learning untuk menciptakan produk yang tidak hanya melayani, tetapi juga mengantisipasi kebutuhan pengguna.',
    },
];

const InteractiveTimeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative mt-4 flex gap-8">
            {/* Kolom Kiri: Lini Masa Vertikal */}
            <div className="flex flex-col items-center">
                <div className="relative">
                    {/* Garis Latar */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-light-navy -translate-x-1/2"></div>
                    {timelineData.map((_, index) => (
                         <button 
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative z-10 block my-4 focus:outline-none`}
                        >
                            <motion.div 
                                className="w-4 h-4 rounded-full border-2 bg-navy"
                                animate={activeIndex === index ? { scale: 1.5, borderColor: '#64ffda' } : { scale: 1, borderColor: '#303C55' }}
                                whileHover={{ scale: 1.75 }}
                            >
                                {activeIndex === index && <motion.div layoutId="active-timeline-dot" className="w-full h-full rounded-full bg-accent" />}
                            </motion.div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Kolom Kanan: Konten */}
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-6 rounded-lg bg-light-navy/50 border border-slate/10 min-h-[160px]"
                    >
                        <span className="font-mono text-accent text-sm">{timelineData[activeIndex].year}</span>
                        <h4 className="font-bold text-slate-lightest mt-1">{timelineData[activeIndex].title}</h4>
                        <p className="mt-2 text-sm text-slate">{timelineData[activeIndex].description}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        
    );
};

export default InteractiveTimeline;

