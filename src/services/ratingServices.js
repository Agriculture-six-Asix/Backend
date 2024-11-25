import { pool } from "../config/configDB.js";

async function getAllRatings() {
    const conn = await pool.getConnection();

    const [ratings] = await conn.query(
        'SELECT ratings.id, users.photo, CONCAT(users.fname, " ", users.lname) as fullname, ratings.score, ratings.content, ratings.created_at, ratings.updated_at FROM ratings INNER JOIN users WHERE ratings.user_id = users.id'
    );
    pool.releaseConnection(conn);
    return ratings;
}

async function createRating(user_id, score, content) {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        'INSERT INTO ratings (user_id, score, content) VALUES (?, ?, ?)',
        [user_id, score, content]
    );
    pool.releaseConnection(conn);
    return result;
}

export const ratingServices = {
    getAllRatings,
    createRating
}