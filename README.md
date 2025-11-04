# **Technical Test FE SGT**

Repositori ini berisi pengerjaan technical test untuk posisi Junior Front End Engineer di PT. SUMMIT GLOBAL TEKNOLOGI. Proyek ini dibangun menggunakan Next.js.

## Instruksi Menjalankan Proyek

Berikut adalah panduan lengkap untuk menjalankan proyek ini di lingkungan lokal Anda.

### a. Persyaratan Sistem

Pastikan sistem Anda memenuhi persyaratan berikut:

- **Node.js**: `v18.17` atau yang lebih baru
- **Package Manager**: `npm` (biasanya sudah terinstal bersama Node.js) atau `yarn`
- **Backend API**: Backend API harus sudah berjalan sebelum menjalankan proyek ini.

### b. Langkah-langkah Instalasi dan Menjalankan

Proyek ini memerlukan API backend untuk dapat berfungsi.

#### 1. Jalankan Backend API

- Unduh dan jalankan proyek backend yang tersedia di tautan Google Drive berikut:
  [Backend API GDrive](https://drive.google.com/file/d/1mJAS-AFxj3NU9jvPD9Ue9Z56ssX4Mcrs/view)
- Pastikan API backend sudah berjalan _sebelum_ melanjutkan ke langkah berikutnya. (Untuk informasi lebih detail tentang API endpoints dan cara setup, silakan baca `README.MD` di repository backend)

#### 2. Instalasi Dependensi Frontend

- Clone Repositori

```sh
git clone https://github.com/maoelanaAs/technical-test-fe-sgt.git
```

- Masuk ke Direktori Proyek

```sh
cd technical-test-fe-sgt
```

- Instal Dependensi

```sh
npm install
```

atau

```sh
yarn install
```

### c. Perintah untuk Menjalankan Proyek

Setelah semua dependensi terinstal, jalankan perintah berikut untuk memulai server development:

```sh
npm run dev
```

atau

```sh
yarn dev
```

Server akan berjalan di mode development. Buka [http://localhost:3000](http://localhost:3000/) di browser untuk melihat hasilnya.
