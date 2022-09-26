import express from 'express';
import { apiLimiter } from '../../../../middlewares/rateLimit';

import {
  generatePost,
  getTopics,
  createPost,
  getPostById,
  getAllPosts,
} from './post.controller';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.post('/generate', apiLimiter(15, 50), generatePost);
router.get('/topics', apiLimiter(15, 50), getTopics);

export default router;
