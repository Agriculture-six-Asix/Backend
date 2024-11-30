import { pool } from "../config/configDB.js";
import bcrypt from "bcrypt";

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

async function changePassword(id, oldPassword, newPassword) {
    const conn = await pool.getConnection();

    const [user] = await conn.query(
        'SELECT id, password FROM Users WHERE id = ?',
        [id]
    );

    if (user.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    const comparePassword = await bcrypt.compare(oldPassword, user[0].password);

    if (!comparePassword) {
        throw new Error('Password invalid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [res] = await conn.query(
        'UPDATE Users SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );

    pool.releaseConnection(conn);
    return res;
}

export const userServices = {
    getUserById,
    changePassword
}