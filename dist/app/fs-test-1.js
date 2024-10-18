"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogFile = exports.fsRead = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filedir = path_1.default.join(process.cwd(), 'app/files');
const filepath = path_1.default.join(filedir, 'example.txt');
const fsRead = () => {
    fs_1.default.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error:', err);
        }
        else {
            console.log('Data:', data);
        }
    });
};
exports.fsRead = fsRead;
const createLogFile = (logMessage) => {
    const today = new Date();
    const day = today.getDate();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const localDateString = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
    const logFileName = `log-${day}-${month}-${year}.txt`;
    const logDir = path_1.default.join(process.cwd(), 'logs');
    const logFilePath = path_1.default.join(logDir, logFileName);
    if (!fs_1.default.existsSync(logDir)) {
        console.log('Logs folder not found.');
    }
    if (!fs_1.default.existsSync(logFilePath)) {
        console.log('Log file not found. Creating a new one...');
        fs_1.default.writeFileSync(logFilePath, '', 'utf8');
        console.log(`Log file created: ${logFilePath}`);
    }
    fs_1.default.appendFile(logFilePath, `${localDateString}: ${logMessage}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
        else {
            console.log(`Log entry added to ${logFilePath}`);
        }
    });
};
exports.createLogFile = createLogFile;
