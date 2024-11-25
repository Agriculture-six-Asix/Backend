import responseError from "../errors/responseError.js";
import { forumServices } from "../services/forumService.js";

async function getAllForums(req, res, next) {
    try {
        const forums = await forumServices.getAllForums();
        res.status(200).json({
            message: 'Forum berhasil ditemukan',
            success: true,
            data: {
                forums
            }
        })
    } catch (error) {
        if(error.message === "Forum  tidak ditemukan") {
            next(new responseError('Forum tidak ditemukan', 404, false));
        } else {
            next(error);
        }
    }
}

async function getForumById(req, res, next) {
    try {
        const { id } = req.params;
        const forum = await forumServices.getForumById(id);
        if(!forum) {
            throw new responseError('Forum tidak ditemukan', 404, false);
        }
        res.status(200).json({
            message: 'Forum berhasil ditemukan',
            success: true,
            data: {
                forum
            }
        });
    } catch (error) {
        next(error);
    }
}

export const forumController = {
    getAllForums,
    getForumById
}