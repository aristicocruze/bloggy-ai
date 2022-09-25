import express from "express";
import { getPosts } from "./post.controller";

const router = express.Router();

router.get("/", getPosts);

export default router;
