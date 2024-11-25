import { ratingServices } from "../services/ratingServices.js";
import responseError from "../errors/responseError.js";

async function getAllRatings(req, res, next) {
    try {
        const ratings = await ratingServices.getAllRatings();
        if(!ratings) {
            throw new responseError('Rating tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Rating berhasil ditemukan',
                success: true,
                data: {
                    ratings
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

export const ratingController = {
    getAllRatings
}