import { Router } from "express";
import { repliesController } from "../controllers/repliesController.js";

const repliesRoutes = Router();

repliesRoutes.get('/:forum_id/replies', async (req, res, next) => {
    await repliesController.getRepliesByForumId(req, res, next);
});

export default repliesRoutes;