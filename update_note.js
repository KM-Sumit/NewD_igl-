const fs = require('fs');
const CryptoJS = require('crypto-js');

const DATA_FILE_PATH = './backend/data.json';
const DEFAULT_KEY = "Vision@2026";

const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf8');
const payload = JSON.parse(fileContent).payload;

const decryptedBytes = CryptoJS.AES.decrypt(payload, DEFAULT_KEY);
const rawJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8);
const data = JSON.parse(rawJsonString);

data.notes.push({
    title: "Complete Mathematics Notes",
    class: "10",
    subject: "Mathematics",
    price: "233",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    link: "https://drive.google.com/file/d/example_math_pdf_link/view",
    description: "Comprehensive handwritten notes for Mathematics covering all chapters."
});

const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), DEFAULT_KEY).toString();
fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ payload: encryptedData }, null, 2), 'utf8');

console.log("Note added successfully!");
