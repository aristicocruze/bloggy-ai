import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Testing endpoint!");
});

export default router;
