import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";

import Post from "../models/post.model.js"

const router = express.Router();

// router.get("/", async (req, res) => {
//   const posts = await Post.find()
//   res.status(200).send(posts)
// })

router.get("/upload-auth", uploadAuth); // Placed at top of other routes bc, since we are using dynamic "/:slug", there will be conflict thinking that "/upload-auth" is a slug.
router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);

export default router;
