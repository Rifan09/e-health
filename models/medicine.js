const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  ID_Obat: { 
    type: String, 
    required: true, 
    unique: true 
  },
  Nama_Obat: { 
    type: String, 
    required: true 
  },
  Kategori: { 
    type: String, 
    required: true 
  },
  Indikasi: { 
    type: [String], // Daftar indikasi penggunaan obat
    required: true 
  },
  Kontraindikasi: { 
    type: [String], // Daftar kondisi yang tidak dianjurkan menggunakan obat ini
    required: true 
  },
  Dosis_Dewasa: { 
    type: String, 
    required: true 
  },
  Dosis_Anak: { 
    type: String, 
    required: true 
  },
  Bentuk_Sediaan: { 
    type: String, 
    required: true 
  },
  Kandungan: { 
    type: String, 
    required: true 
  },
  Efek_Samping: { 
    type: [String], 
    required: true 
  },
  Interaksi: { 
    type: [String], 
    required: true 
  },
  Peringatan: { 
    type: [String], 
    required: true 
  },
  Harga: { 
    type: Number, 
    required: true 
  },
  Ketersediaan: { 
    type: Boolean, 
    required: true 
  },
  Produsen: { 
    type: String, 
    required: true 
  },
  No_BPOM: { 
    type: String, 
    required: true 
  },
  Golongan: { 
    type: String, 
    required: true 
  },
  Rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Membuat model Medicine
const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;