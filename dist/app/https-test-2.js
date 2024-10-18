"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Using mkcert localhost cert
const http2_1 = require("http2");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Path to the SSL certificate and key
const ssldir = path_1.default.join(process.cwd(), 'app/ssl');
const sslkey = path_1.default.join(ssldir, 'localhost-key.pem');
const sslcrt = path_1.default.join(ssldir, 'localhost.pem');
// Load the SSL certificate and key
const serverOptions = {
    key: fs_1.default.readFileSync(sslkey),
    cert: fs_1.default.readFileSync(sslcrt),
};
// Create an HTTP/2 server with TLS
const server = (0, http2_1.createSecureServer)(serverOptions, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Secure World with CERT for localhost!\n');
});
server.listen(5001, () => {
    console.log('Secure Server running at https://localhost:5001/');
});
