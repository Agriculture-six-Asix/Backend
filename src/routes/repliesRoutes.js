import { Router } from "express";
import { repliesController } from "../controllers/repliesController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const repliesRoutes = Router();

repliesRoutes.get('/:forum_id/replies', async (req, res, next) => {
    await repliesController.getRepliesByForumId(req, res, next);
});

repliesRoutes.post('/replies/create', verifyToken, async (req, res, next) => {
    await repliesController.createReply(req, res, next);
})

export default repliesRoutes;