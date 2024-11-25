import { pool } from "../config/configDB.js";

async function getAllRatings() {
    const conn = await pool.getConnection();

    const [ratings] = await conn.query(
        'SELECT ratings.id, users.photo, CONCAT(users.fname, " ", users.lname) as fullname, ratings.score, ratings.content, ratings.created_at, ratings.updated_at FROM ratings INNER JOIN users WHERE ratings.user_id = users.id'
    );
    pool.releaseConnection(conn);
    return ratings;
}

export const ratingServices = {
    getAllRatings
}