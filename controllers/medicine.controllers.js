const Medicine = require('../models/medicine');


// Halaman daftar obat
module.exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.render('medicines/index', { medicines });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Halaman tambah obat
module.exports.getAddMedicines = (req, res) => {
  res.render('medicines/add-edit', { medicine: null });
};

// Halaman edit obat
module.exports.getEditMedicines = async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
        return res.status(404).send('Obat tidak ditemukan');
      }
      res.render('medicines/add-edit', { medicine });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

// Proses tambah obat
module.exports.createMedicines = async (req, res) => {
  try {
    // Konversi array fields
    const arrayFields = [
      'Indikasi', 
      'Kontraindikasi', 
      'Efek_Samping', 
      'Interaksi', 
      'Peringatan'
    ];

    arrayFields.forEach(field => {
      if (req.body[field]) {
        req.body[field] = req.body[field]
          .split(',')
          .map(item => item.trim())
          .filter(item => item !== '');
      }
    });

    // Konversi tipe data
    req.body.Harga = parseFloat(req.body.Harga);
    req.body.Ketersediaan = req.body.Ketersediaan === 'true';
    req.body.Rating = parseInt(req.body.Rating);

    // Buat obat baru
    const medicine = new Medicine(req.body);
    await medicine.save();

    res.redirect('/medicines');
  } catch (err) {
    res.status(400).render('medicines/add-edit', { 
      medicine: req.body, 
      error: err.message 
    });
  }
};

// Proses update obat
module.exports.updateMedicines = async (req, res) => {
  try {
    // Konversi array fields
    const arrayFields = [
      'Indikasi', 
      'Kontraindikasi', 
      'Efek_Samping', 
      'Interaksi', 
      'Peringatan'
    ];

    arrayFields.forEach(field => {
      if (req.body[field]) {
        req.body[field] = req.body[field]
          .split(',')
          .map(item => item.trim())
          .filter(item => item !== '');
      }
    });

    // Konversi tipe data
    req.body.Harga = parseFloat(req.body.Harga);
    req.body.Ketersediaan = req.body.Ketersediaan === 'true';
    req.body.Rating = parseInt(req.body.Rating);

    // Update obat
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!medicine) {
      return res.status(404).send('Obat tidak ditemukan');
    }

    res.redirect('/medicines');
  } catch (err) {
    console.error(err);
    res.status(400).render('medicines/add-edit', { 
      medicine: req.body, 
      error: err.message 
    });
  }
};


// Hapus obat
module.exports.deleteMedicines = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    
    if (!medicine) {
      return res.status(404).send('Obat tidak ditemukan');
    }

    res.redirect('/medicines');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
