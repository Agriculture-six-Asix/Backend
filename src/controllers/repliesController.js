import responseError from "../errors/responseError.js";
import { repliesServices } from "../services/repliesServices.js";

async function getRepliesByForumId(req, res, next) {
    try {
        const forum_id = req.params.forum_id;
        const replies = await repliesServices.getRepliesByForumId(forum_id);

        if(replies.length === 0) {
            throw new responseError('Balasan tidak ditemukan', 404, false);
        }

        res.status(200).json({
            message: 'Balasan berhasil ditemukan',
            success: true,
            data: {
                replies
            }
        });
    } catch (error) {
        next(error);
    }
}

export const repliesController = {
    getRepliesByForumId
}