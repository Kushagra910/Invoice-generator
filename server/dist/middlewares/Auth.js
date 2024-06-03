"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Auth middleware
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token
        const token = req.cookies.token ||
            ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || '';
        // If token is missing 
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }
        const secret = process.env.JWT_SECRET || '';
        // Verify the token 
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            console.log(decoded);
            // Adding user property to request
            req.user = decoded;
            next();
        }
        catch (err) {
            // Verification issues
            res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
});
exports.auth = auth;