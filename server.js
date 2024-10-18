"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Path to the SSL certificate and key
const ssldir = path_1.default.join(process.cwd(), 'app/ssl');
const sslkey = path_1.default.join(ssldir, 'localhost-key.pem');
const sslcrt = path_1.default.join(ssldir, 'localhost.pem');
// Load the SSL certificate and key
const serverOptions = {
    key: fs_1.default.readFileSync(sslkey),
    cert: fs_1.default.readFileSync(sslcrt),
};
// Set up a basic route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express over HTTPS!');
});
// Create an HTTPS server
const httpsServer = https_1.default.createServer(serverOptions, app);
// Start the HTTPS server
httpsServer.listen(PORT, () => {
    console.log(`Secure Server is running at https://localhost:${PORT}/`);
});
