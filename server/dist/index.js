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
const auth = require('./middlewares/auth');
dotenv_1.default.config();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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
