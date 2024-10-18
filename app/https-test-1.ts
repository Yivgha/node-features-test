// Secure localhost with self-signed certificate
import {
  Http2SecureServer,
  createSecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from 'http2';
import fs from 'fs';
import path from 'path';

const ssldir = path.join(process.cwd(), 'app/ssl');

const serverOptions = {
  key: fs.readFileSync(path.join(ssldir, 'server.key')),
  cert: fs.readFileSync(path.join(ssldir, 'server.crt')),
};

const server: Http2SecureServer = createSecureServer(
  serverOptions,
  (req: Http2ServerRequest, res: Http2ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Secure World!\n');
  }
);

server.listen(5001, () => {
  console.log('Secure Server running at https://localhost:5001/');
});

