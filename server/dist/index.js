"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./configs/db"));
const authRoutes = require('./routes/auth');
const invoiceRoutes = require("./routes/Invoice");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Handle preflight requests
app.options('*', (0, cors_1.default)({
    origin: ['http://localhost:5173'], // Add your frontend URL here
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
(0, db_1.default)();
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/invoice', invoiceRoutes);
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: `Your server is running `
    });
});
app.listen(port, () => {
    console.log(`server is up and running at port ${port}`);
});
