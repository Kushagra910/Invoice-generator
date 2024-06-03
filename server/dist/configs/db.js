"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1); // Exit the process with a failure code
}
const connect = () => {
    mongoose_1.default.connect(databaseUrl).then(() => console.log('DB connected Successfully'))
        .catch((err) => {
        console.log("DB connection Failure");
        console.error(err);
        process.exit(1);
    });
};
exports.default = connect;
