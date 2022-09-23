import express from "express";
import postRoute from "../modules/api/v1/posts/post.route";

const router = express.Router();

router.use("/posts", postRoute);

export default router;
