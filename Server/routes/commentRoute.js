import express from 'express';
const router = express.Router();
import {authenticate } from '../middlewares/authMiddleware.js'
import { addComment , getComment , addReply} from '../controllers/commentController.js';

router.post('/addComment' , authenticate, addComment);

router.get('/getComment' , getComment);

router.post('/addReply' , authenticate, addReply);

export default router;
