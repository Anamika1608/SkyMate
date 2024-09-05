import express from 'express';
const router = express.Router();

import { upload, posts } from '../controllers/postController.js';

router.post('/upload' , upload) ;

router.get('/posts' , posts);

export default router;