"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { signUp, login } = require('../controllers/Auth');
// ********************************************************************************************
//                           Authentication routes
// ********************************************************************************************
// Route for user login
router.post("/login", login);
// Route for user signup
router.post("/signup", signUp);
module.exports = router;
