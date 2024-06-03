import express from 'express'
const { createInvoice ,getInvoice } = require('../controllers/Invoice');
const  {auth}  = require('../middlewares/auth');

const router = express.Router();

// ********************************************************************************************
//                           Invoice routes
// ********************************************************************************************


router.post('/addProduct' ,auth, createInvoice);
// router.get('/getInvoice',auth,getInvoice);
module.exports = router;