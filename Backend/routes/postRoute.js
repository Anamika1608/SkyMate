import express from 'express';
import {authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router();

import { upload, posts , getPost , editCaption, deletePost } from '../controllers/postController.js';

router.post('/upload' , authenticate , upload) ;

router.get('/posts/:id' , getPost);

router.get('/posts' , posts);

router.put('/edit_caption/:id',editCaption);

router.delete('/delete_post/:id',deletePost);

export default router;