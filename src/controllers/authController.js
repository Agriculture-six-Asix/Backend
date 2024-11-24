import { authServices } from "../services/authServices.js";
import responseError from "../errors/responseError.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res, next) {
    try {
        const { fname, lname, email, username, password } = req.body;
        if (!fname || !email || !username || !password) {
            throw new(responseError('Semua data harus diisi', 400, false));
        }

        await authServices.registerUser(fname, lname, email, username, password);
        res.status(201).json({
            message: 'User berhasil didaftarkan',
            success: true,
            data: {
                fname,
                lname,
                username
            }
        });
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY') {
            next(new responseError('Username atau Email sudah terdaftar', 409, false));
        } else {
            next(error);
        }
    }
}

async function loginUser(req, res, next) {
    try {
       const { username, password } = req.body;
        if (!username || !password) {
            throw new responseError('Username dan Password harus diisi', 400, false);
        }

        const user = await authServices.loginUser(username, password);
        
        const token = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_ACCESS_SECRET,{ expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });

        res.status(200).json({
            message: 'Login berhasil',
            success: true,
            data: {
                user: {
                    id: user.user_id,
                    username: user.username
                },
                token: token,
            }
        });
    } catch (error) {
        if(error.message === 'Username atau Password salah') {
            next(new responseError('Username atau Password salah', 401, false));
        } else {
            next(error);
        }
    }
}

async function logoutUser(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, user) => {
                if(!err) {
                    await authServices.logoutUser(token);
                }
            });
        }
        res.status(200).json({
            message: 'Logout berhasil',
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

export const authController = {
    registerUser,
    loginUser,
    logoutUser
};