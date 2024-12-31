const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Medicine = require('../models/medicine'); // Path yang benar

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost/ehealth')
  .then(async () => {
    try {
      // Membaca file JSON
      const filePath = path.join(__dirname, '../data/Obat-Real.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Menghapus data lama (opsional)
      await Medicine.deleteMany();

      // Memperbaiki data sebelum disimpan
      for (const item of data) {
        item.Harga = parseFloat(item.Harga.replace(/[^0-9.-]+/g, ""));
        
        // Memastikan field yang diperlukan ada
        if (!item.No_BPOM) {
          throw new Error(`NO_BPOM is required for item ${item.Nama_Obat}`);
        }
        if (typeof item.Ketersediaan === 'undefined') {
          throw new Error(`Ketersedian is required for item ${item.Nama_Obat}`);
        }
        item.Ketersediaan = item.Ketersediaan === "Tersedia"; // Mengubah "Tersedia" menjadi true
        
        // Cek jika ID_Obat sudah ada
        const existingMedicine = await Medicine.findOne({ ID_Obat: item.ID_Obat });
        if (!existingMedicine) {
          await Medicine.create(item);
        } else {
          console.log(`Item with ID_Obat ${item.ID_Obat} already exists.`);
        }
      }

      console.log('Data dummy obat telah berhasil dimasukkan!');

    } catch (err) {
      console.error('Error saat memproses data:', err);
    } finally {
      // Menutup koneksi ke MongoDB
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('Error koneksi ke MongoDB:', err);
  });