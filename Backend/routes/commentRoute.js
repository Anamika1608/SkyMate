import express from 'express';
const router = express.Router();
import {authenticate } from '../middlewares/authMiddleware.js'
import { addComment , getComment} from '../controllers/commentController.js';

router.post('/addComment' , authenticate, addComment);

router.get('/getComment' , getComment);

export default router;
