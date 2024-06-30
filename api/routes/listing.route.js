import express from 'express';
import { uploadFile, getListings, deleteList } from '../controllers/listing.controller.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/get', getListings);
router.delete('/delete/:listId', deleteList)

export default router;