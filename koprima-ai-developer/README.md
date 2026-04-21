# KOPRIMA App

Aplikasi frontend React + Vite untuk simulasi pengalaman anggota **Koperasi Primadona Mandiri (KOPRIMA)**. Fokus utamanya adalah alur onboarding, autentikasi, beranda anggota, belanja sembako, simpanan, checkout, dan profil.

## Status proyek

- Tipe proyek: frontend statis
- Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons
- Backend/API: belum terhubung
- Environment variable wajib: tidak ada

## Menjalankan lokal

Prasyarat:
- Node.js 20+
- npm 10+

Langkah:

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## Build produksi

```bash
npm run build
npm run preview
```

Preview produksi berjalan di `http://localhost:4173`.

## Script penting

- `npm run dev` — menjalankan server development
- `npm run build` — build produksi
- `npm run preview` — preview hasil build
- `npm run lint` — pengecekan TypeScript
- `npm run clean` — hapus folder `dist`

## Struktur proyek

```text
.
├── index.html
├── package.json
├── src/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tsconfig.json
└── vite.config.ts
```

## Catatan rapih untuk workflow Pengembang AI

- Dependensi yang tidak terpakai sudah dibersihkan.
- Konfigurasi Vite disederhanakan agar fokus pada frontend murni.
- README ini ditulis ulang agar lebih jelas saat proyek dipindahkan atau dibuka ulang.
- Proyek saat ini masih memakai satu file layar utama (`src/App.tsx`). Jika ingin tahap berikutnya, proyek bisa dipecah ke folder `components/`, `screens/`, dan `data/`.
