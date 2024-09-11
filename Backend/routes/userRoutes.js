import { getUser } from '../controllers/userController.js';

import express from 'express';

const router = express.Router();

router.get('/get_user',getUser);

export default router;
