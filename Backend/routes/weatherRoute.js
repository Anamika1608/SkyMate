import express from 'express';
const router = express.Router();

import {weatherForecast} from '../controllers/weatherController.js'

router.get('/weather',weatherForecast);

export default router;