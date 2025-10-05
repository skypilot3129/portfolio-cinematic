"use client";

import { useState, useEffect, useRef } from 'react';

// Menggunakan generic type <T> yang merupakan turunan dari HTMLElement
// Ini memungkinkan hook untuk menerima tipe elemen yang lebih spesifik.
export const useScrollAnimation = <T extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  // Type ref sekarang menjadi lebih spesifik berdasarkan T (misal: HTMLDivElement atau HTMLElement)
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

