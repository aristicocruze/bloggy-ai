import express from 'express';
import { apiLimiter } from '../../../../middlewares/rateLimit';

import { generatePost, getTopics } from './post.controller';

const router = express.Router();

router.post('/', apiLimiter(15, 50), generatePost);
router.get('/topics', apiLimiter(15, 50), getTopics);

export default router;
