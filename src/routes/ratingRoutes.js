import { Router } from "express";
import { ratingController } from "../controllers/ratingController.js";

const ratingRoutes = Router();

ratingRoutes.get('/', async (req, res, next) => {
    await ratingController.getAllRatings(req, res, next);
});

export default ratingRoutes;