import express from 'express';
import {authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router();

import { upload, posts } from '../controllers/postController.js';

router.post('/upload' , authenticate , upload) ;

router.get('/posts' , posts);

export default router;