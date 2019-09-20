const express = require('express');
const router = express.Router()
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.post('/', multer, sauceCtrl.createSauce);
router.get('/',sauceCtrl.getAllSauces);

module.exports = router;