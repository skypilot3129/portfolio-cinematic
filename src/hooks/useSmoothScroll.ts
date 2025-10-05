"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Inisialisasi Lenis untuk menciptakan efek smooth scroll.
    const lenis = new Lenis();

    // Fungsi ini akan terus-menerus mengupdate posisi scroll Lenis
    // pada setiap frame animasi, sehingga membuatnya mulus.
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Mulai loop animasi.
    requestAnimationFrame(raf);
    
    // Cleanup function untuk menghentikan Lenis saat komponen unmount
    // agar tidak menyebabkan memory leak.
    return () => {
      lenis.destroy();
    };
  }, []);
};
