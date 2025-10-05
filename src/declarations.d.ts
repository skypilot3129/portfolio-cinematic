// File ini digunakan untuk mendeklarasikan tipe untuk modul yang tidak memiliki definisi tipe sendiri.

// Ini memungkinkan TypeScript untuk memahami impor untuk file .glb (model 3D).
declare module '*.glb';

// Ini memungkinkan TypeScript untuk memahami impor untuk file .png (gambar).
declare module '*.png';

// Ini menyediakan definisi tipe dasar untuk 'meshline', sebuah pustaka yang digunakan oleh komponen Lanyard.
declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

// PERBAIKAN: Menambahkan deklarasi untuk modul maath/random
declare module 'maath/random/dist/maath-random.esm';

// Ini memperluas namespace JSX global untuk mengenali elemen kustom dari meshline.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// Ekspor kosong ini menjadikan file ini sebagai sebuah modul.
export { };

