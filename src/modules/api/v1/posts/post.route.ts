import express from 'express';
import { apiLimiter } from '../../../../middlewares/rateLimit';

import { generatePost, getTopics } from './post.controller';

const router = express.Router();

router.post('/', apiLimiter, generatePost);
router.get('/topics', apiLimiter, getTopics);

export default router;
