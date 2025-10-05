import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Note: "next/typescript" is usually included in core-web-vitals, so it might be redundant.
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // PERBAIKAN: Tambahkan file yang ingin diabaikan di sini
      "src/components/ui/Lanyard.tsx",
      "src/components/ui/ProfileCard.tsx"
    ],
  },
];

export default eslintConfig;
    
