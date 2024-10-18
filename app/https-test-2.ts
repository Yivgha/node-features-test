// Using mkcert localhost cert
import {
  Http2SecureServer,
  createSecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from 'http2';
import fs from 'fs';
import path from 'path';

// Path to the SSL certificate and key
const ssldir = path.join(process.cwd(), 'app/ssl');
const sslkey = path.join(ssldir, 'localhost-key.pem');
const sslcrt = path.join(ssldir, 'localhost.pem');

// Load the SSL certificate and key
const serverOptions = {
  key: fs.readFileSync(sslkey),
  cert: fs.readFileSync(sslcrt),
};

// Create an HTTP/2 server with TLS
const server: Http2SecureServer = createSecureServer(
  serverOptions,
  (req: Http2ServerRequest, res: Http2ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Secure World with CERT for localhost!\n');
  }
);

server.listen(5001, () => {
  console.log('Secure Server running at https://localhost:5001/');
});

