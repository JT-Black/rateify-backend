import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 3000;
export const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/music';
export const secret = process.env.SECRET || 'threeBlindMice';
