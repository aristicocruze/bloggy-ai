import express from 'express';
import { apiLimiter } from '../../../../middlewares/rateLimit';

import {
  generatePost,
  getTopics,
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
} from './post.controller';

const router = express.Router();

router.get('/topics', apiLimiter(15, 50), getTopics);
router.get('/', getAllPosts);
router.put('/:id', apiLimiter(15, 3), updatePost); // 3 requests per 15 minutes
router.post('/', createPost);
router.get('/:id', getPostById);
router.post('/generate', apiLimiter(15, 50), generatePost);

export default router;
