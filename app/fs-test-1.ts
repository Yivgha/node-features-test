import fs from 'fs';
import path from 'path';

const filedir = path.join(process.cwd(), 'app/files');
const filepath = path.join(filedir, 'example.txt');

export const fsRead = () => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Data:', data);
    }
  });
};

export const createLogFile = (logMessage: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const localDateString = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
  const logFileName = `log-${day}-${month}-${year}.txt`;

  const logDir = path.join(process.cwd(), 'logs');
  const logFilePath = path.join(logDir, logFileName);

  if (!fs.existsSync(logDir)) {
    console.log('Logs folder not found.');
  }

  if (!fs.existsSync(logFilePath)) {
    console.log('Log file not found. Creating a new one...');
    fs.writeFileSync(logFilePath, '', 'utf8');
    console.log(`Log file created: ${logFilePath}`);
  }

  fs.appendFile(logFilePath, `${localDateString}: ${logMessage}\n`, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      console.log(`Log entry added to ${logFilePath}`);
    }
  });
};

