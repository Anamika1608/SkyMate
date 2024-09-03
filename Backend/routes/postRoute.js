import express from 'express';
const router = express.Router();

import { upload, posts } from '../controllers/postController';

router.post('/upload' , upload) ;

router.get('/posts' , posts);
