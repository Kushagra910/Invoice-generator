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
const User = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// SignUp Handler
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data fetch from request body
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        // validate karlo
        if (!firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        // 2 password match karlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password donot match retry",
            });
        }
        // check User already exist or not
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: " User is already registered",
            });
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Entry create in DB
        const user = yield User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });
        // return res
        return res.status(200).json({
            success: true,
            message: "User is Registered Successfully",
            user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered please try again",
        });
    }
});
// Login Handler
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // validate the data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required , please try again",
            });
        }
        // user check exist or not
        const user = yield User.findOne({ email });
        if (!user) {
            return user.status(401).json({
                success: false,
                message: "User is not registered,please signup first",
            });
        }
        // generate JWT, after password matching
        if (yield bcrypt_1.default.compare(password, user.password)) {
            const payLoad = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined in the environment variables");
            }
            const token = jsonwebtoken_1.default.sign(payLoad, secret, {
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined;
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            // create cookie and send response
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login Failure , please try again",
        });
    }
});
