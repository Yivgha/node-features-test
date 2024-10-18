import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

const ssldir = path.join(process.cwd(), 'app/ssl');

// Load the SSL certificate and key
const serverOptions = {
  key: fs.readFileSync(path.join(ssldir, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(ssldir, 'localhost.pem')),
};

app.get('/', (req: Request, res: Response) => {
  res.send('Secured Express app!');
});

const httpsServer = https.createServer(serverOptions, app);

httpsServer.listen(PORT, () => {
  console.log(`Secure Server is running at https://localhost:${PORT}/`);
});

