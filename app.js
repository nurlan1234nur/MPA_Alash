import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname тодорхойлох
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// public хавтасны бүх файлыг serve хийх
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Сервер эхлэх
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
