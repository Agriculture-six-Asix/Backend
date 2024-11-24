import { userServices } from "../services/userServices.js";
import responseError from "../errors/responseError.js";

async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        if(!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        const user = await userServices.getUserById(id);
        res.status(200).json({
            message: 'User berhasil ditemukan',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if(error.message === "User tidak ditemukan") {
            next(new responseError('User tidak ditemukan', 404, false));
        } else {
            next(error);
        }
    }
}

export const userController = {
    getUserById
}