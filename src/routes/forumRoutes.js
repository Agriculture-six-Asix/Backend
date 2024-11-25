import { Router } from "express";
import { forumController } from "../controllers/forumController.js";

const forumRoutes = Router();

forumRoutes.get('/', async (req, res, next) => {
    await forumController.getAllForums(req, res, next);
});

forumRoutes.get('/:id', async (req, res, next) => {
    await forumController.getForumById(req, res, next);
});

export default forumRoutes;