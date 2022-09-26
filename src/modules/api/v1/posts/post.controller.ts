import { Request, Response } from 'express';
import logger from '../../../../utils/logger';
import { generate, topics } from './post.service';

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
