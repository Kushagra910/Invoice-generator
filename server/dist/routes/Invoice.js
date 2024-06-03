"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createInvoice, getInvoice } = require('../controllers/Invoice');
const { auth } = require('../middlewares/auth');
const router = express_1.default.Router();
// ********************************************************************************************
//                           Invoice routes
// ********************************************************************************************
router.post('/addProduct', auth, createInvoice);
// router.get('/getInvoice',auth,getInvoice);
module.exports = router;
