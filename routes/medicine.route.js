const express = require('express');
const router = express.Router();
const MedicinesController = require('../controllers/medicine.controllers');


// Halaman daftar obat
router.get('/', MedicinesController.getMedicines);

// Halaman tambah obat
router.get('/addobat', MedicinesController.getAddMedicines);

// Halaman edit obat
router.get('/:id/edit', MedicinesController.getAddMedicines);

// Proses tambah obat
router.post('/add', MedicinesController.createMedicines);

// Proses update obat
router.put('/:id', MedicinesController.updateMedicines);

// Hapus obat
router.delete('/:id', MedicinesController.deleteMedicines);




module.exports = router;