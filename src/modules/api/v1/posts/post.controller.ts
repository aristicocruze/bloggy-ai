import { Request, Response } from "express";
import logger from "../../../../utils/logger";
import { get } from "./post.service";

export async function getPosts(req: Request, res: Response) {
  const search = req.query.search as string;

  try {
    if (!search) {
      res.status(400).send({ message: "search param is required" });
      return;
    }

    const data = await get(search);

    return res.status(200).json({
      success: true,
      data: data.data.choices,
      usage: data.data.usage,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error });
  }
}
