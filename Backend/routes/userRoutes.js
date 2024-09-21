import { getUser, getUserPost } from '../controllers/userController.js';

import express from 'express';

const router = express.Router();

router.get('/get_user',getUser);

router.get('/get_my_posts/:id',getUserPost);

export default router;
