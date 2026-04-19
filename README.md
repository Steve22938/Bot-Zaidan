# Bahasa Indonesia 🇮🇩

# Bot-Zaidan
# 👑 Bot-Zaidan (The Quiz Slayer)
Proyek bot Minecraft berbasis Node.js yang dikembangkan khusus untuk optimasi kecepatan dan akurasi dalam menjawab kuis server.
> **Dibuat oleh:** Zaidan (Indonesia)
> 
### ⚠️ Disclaimer: Tahap Pengembangan
Bot ini **BUKAN** versi final. Saat ini masih dalam tahap pengembangan awal (*WIP*), kemungkinan masih terdapat beberapa *bug*, dan performanya mungkin belum stabil di semua lingkungan server. Gunakan dengan bijak!
### 🛠️ Cara Instalasi & Pengaktifan
*(Catatan: Proyek ini telah diuji di **Localhost**. Untuk penggunaan di **Pterodactyl Panel**, silakan lakukan penyesuaian konfigurasi.)*
#### 1. Persiapan Lingkungan
Pastikan kamu sudah menginstal **Node.js** versi stabil terbaru di sistem kamu.
#### 2. Instalasi Dependency
Buka terminal/console kamu, arahkan ke folder proyek, lalu jalankan perintah:
```bash
npm install mineflayer mineflayer-tps mineflayer-pathfinder mineflayer-pvp mineflayer-auto-eat

```
#### 3. Konfigurasi Otak (Brain)
 * Cari atau siapkan file kamus bahasa Indonesia (KBBI) dalam format .json atau sesuaikan dengan bahasa yang digunakan oleh server Minecraft tujuan.
 * Masukkan file tersebut ke folder utama proyek dan ubah namanya menjadi words.json.
#### 4. Pengaturan Mesin (Main Engine)
Buka file bot.js dan perhatikan bagian **Main Engine** (biasanya di paragraf/blok kode ketiga). Sesuaikan data berikut:
 * **Username & Password:** Masukkan akun bot kamu.
 * **MainAccount:** Nama akun utama kamu (untuk menerima transfer hasil kuis).
 * **PayAmount & minTransfer:** Atur nominal otomatisasi pembayaran.
 * **Version:** **Wajib** disesuaikan dengan versi Minecraft server tujuan agar koneksi lancar.
#### 5. Menjalankan Bot
Jika semua sudah siap, jalankan bot dengan perintah:
```bash
node bot.js

```

# Bahasa Inggris 🇬🇧

# Bot-Zaidan
This bot was created by an Indonesian developer named **Zaidan**.
# Disclaimer: Work In Progress
This is **NOT** the final version. It is currently in an early development stage, potentially unstable, and likely contains various bugs. Use it at your own discretion.
# Installation and Setup
*(Note: This project has been tested on **Localhost**. Compatibility with **Pterodactyl Panel** is currently unverified.)*
 1. **Install Node.js**: Ensure you have the latest stable version of Node.js installed on your system.
 2. **Install Dependencies**: Open your terminal and run the following command:
   ```bash
   npm install mineflayer mineflayer-tps mineflayer-pathfinder mineflayer-pvp mineflayer-auto-eat
   
   ```
 3. **Dictionary Setup**: Acquire an Indonesian Dictionary (KBBI) in .json format or a wordlist that matches the specific language used by your Minecraft server.
 4. **Configuration**:
   * Place the .json file in the root directory.
   * Rename the file to words.json.
 5. **Edit Engine Settings**: Open bot.js and navigate to the third section (**Main Engine**).
 6. **Customize Credentials**:
   * Update the Username and Password for the bot.
   * Set the MainAccount (the account that will receive the funds).
   * Adjust PayAmount and minTransfer values as needed.
   * **Crucial**: Set the Version to match the target Minecraft server version exactly.
 7. **Run the Bot**: Execute the bot by typing the following command in your terminal:
   ```bash
   node bot.js
   
   ```
