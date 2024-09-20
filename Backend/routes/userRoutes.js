import { editCaption, getUser, getUserPost } from '../controllers/userController.js';

import express from 'express';

const router = express.Router();

router.get('/get_user',getUser);

router.get('/get_my_posts/:id',getUserPost);

router.put('/edit_caption/:id',editCaption);

export default router;
