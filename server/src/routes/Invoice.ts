import express from 'express'
const { createInvoice  } = require('../controllers/Invoice');
const auth = require('../middlewares/auth')

const router = express.Router();

// ********************************************************************************************
//                           Invoice routes
// ********************************************************************************************


router.post('/addProduct' ,auth, createInvoice);

module.exports = router;