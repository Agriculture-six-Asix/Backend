import { Router } from "express";
import { userController } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get('/:id', async (req, res, next) => {
    await userController.getUserById(req, res, next);
});

export default userRoutes;