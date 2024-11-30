import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRoutes = Router();

userRoutes.get('/:id', async (req, res, next) => {
    await userController.getUserById(req, res, next);
});

userRoutes.post('/:id/change-password', verifyToken, async (req, res, next) => {
    await userController.changePassword(req, res, next);
});

export default userRoutes;