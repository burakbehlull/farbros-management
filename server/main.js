import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import { db } from "./config/index.js"

const app = express();

db()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello farbros managament');
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});


