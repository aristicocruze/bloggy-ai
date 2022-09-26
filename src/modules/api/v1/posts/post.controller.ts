import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../../../utils/logger';
import { getPagination, getPaginData } from '../../../../utils/pagination';
import { generate, topics, save, byId, getAll } from './post.service';

export async function generatePost(req: Request, res: Response) {
  const search = req.query.search as string;

  try {
    if (!search) {
      res.status(400).send({ message: 'search param is required' });
      return;
    }
    const data = await generate(search);

    return res.status(200).json({
      success: true,
      data: data.data.choices,
      //usage: data.data.usage,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error });
  }
}

export async function getTopics(req: Request, res: Response) {
  const topic = req.query.topic as string;

  try {
    if (!topic) {
      res.status(400).send({ message: 'topic param is required' });
      return;
    }
    const data = await topics(topic);

    return res.status(200).json({
      success: true,
      data: data.data.choices,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error });
  }
}

export async function createPost(req: Request, res: Response) {
  const post = req.body;

  try {
    post.id = uuidv4();
    const data = await save(post);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error });
  }
}

export async function getPostById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const data = await byId(id);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await getAll(offset, limit);

    const response = getPaginData(data, page, limit);

    if (!data || data.count === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No posts found.' });
    }

    res.status(200).json({ success: true, data: response });
  } catch (e: any) {
    logger.error('Error getting all orders', e);
    res.status(500).json({ success: false, message: e.message });
  }
}
