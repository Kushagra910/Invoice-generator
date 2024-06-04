"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { createInvoice } = require('../controllers/Invoice');
const { auth } = require('../middlewares/Auth');
// ********************************************************************************************
//                           Invoice routes
// ********************************************************************************************
router.post('/addProduct', auth, createInvoice);
module.exports = router;
