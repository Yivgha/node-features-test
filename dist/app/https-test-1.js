"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Secure localhost with self-signed certificate
const http2_1 = require("http2");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ssldir = path_1.default.join(process.cwd(), 'app/ssl');
const serverOptions = {
    key: fs_1.default.readFileSync(path_1.default.join(ssldir, 'server.key')),
    cert: fs_1.default.readFileSync(path_1.default.join(ssldir, 'server.crt')),
};
const server = (0, http2_1.createSecureServer)(serverOptions, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Secure World!\n');
});
server.listen(5001, () => {
    console.log('Secure Server running at https://localhost:5001/');
});
