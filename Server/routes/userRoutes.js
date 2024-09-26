import { getUser, getUserPost, userSavedPost , unsavePost , getSavedPost } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.get('/get_user', getUser);

router.get('/get_my_posts/:id', getUserPost);

router.put('/save_my_post', authenticate, userSavedPost);

router.put('/unsave_my_post', authenticate, unsavePost);

router.get('/get_saved_post/:id' ,  getSavedPost)

export default router;
