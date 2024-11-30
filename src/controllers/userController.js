import { userServices } from "../services/userServices.js";
import responseError from "../errors/responseError.js";
import bcrypt from "bcrypt";

async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
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
        if (error.message === "User tidak ditemukan") {
            next(new responseError('User tidak ditemukan', 404, false));
        } else {
            next(error);
        }
    }
}

async function changePassword(req, res, next) {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        if (!oldPassword || !newPassword) {
            throw new responseError('Password invalid', 400, false);
        }

        const user = await userServices.changePassword(id, oldPassword, newPassword);
        res.status(200).json({
            message: 'Password berhasil diubah',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if (error.message === 'User tidak ditemukan') {
            next(new responseError('User tidak ditemukan', 404, false));
        } else if (error.message === 'Password invalid') {
            next(new responseError('Password invalid', 400, false));
        } else {
            next(error);
        }
    }
}

export const userController = {
    getUserById,
    changePassword
}