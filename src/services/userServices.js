import { pool } from "../config/configDB.js";

async function getUserById(id) {
    const conn = await pool.getConnection();
    const [user] = await conn.query(
        'SELECT id, photo, fname, lname, username, email FROM Users WHERE id = ?',
        [id]
    )

    if (user.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    pool.releaseConnection(conn);
    return user[0];
}

export const userServices = {
    getUserById
}