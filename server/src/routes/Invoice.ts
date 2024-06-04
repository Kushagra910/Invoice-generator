import express from 'express'
const router = express.Router();
const { createInvoice  } = require('../controllers/Invoice');
const {auth} = require('../middlewares/Auth')


// ********************************************************************************************
//                           Invoice routes
// ********************************************************************************************


router.post('/addProduct' ,auth, createInvoice);

module.exports = router;