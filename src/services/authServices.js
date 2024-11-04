import { pool } from "../config/configDB.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(full_name, email, username, password) {
    const conn = await pool.getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = crypto.randomUUID();

    const [results] = await conn.query(
        'INSERT INTO Users (user_id, full_name, email, username, password) VALUES (?, ?, ?, ?, ?)',
        [uuid, full_name, email, username, hashedPassword]
    );
    pool.releaseConnection(conn);
    return results;
}

async function loginUser(username, password) {
    const conn = await pool.getConnection();
    const [users] = await conn.query(
        'SELECT * FROM Users WHERE username = ?',
        [username]
    );

    if (users.length === 0) {
        throw new Error('Username atau Password salah');
    };

    const isValidPassword = await bcrypt.compare(password, users[0].password);
    if(!isValidPassword) {
        throw new Error('Username atau Password salah');
    };
    
    return users[0];
}

async function logoutUser(refreshToken) {
   const conn = await pool.getConnection();
   const [results] = await conn.query(
        `INSERT INTO Blacklist_Tokens (token) VALUES (?)`,
        [refreshToken]
    );
    pool.releaseConnection(conn);
    return results;
}

async function refreshToken(refreshToken) {
    if (!refreshToken) {
        throw new Error('Token tidak valid');
    }

    const conn = await pool.getConnection();
    const [blacklistToken] = await conn.query(
        'SELECT * FROM Blacklist_Tokens WHERE token = ?',
        [refreshToken]
    );

    if(blacklistToken.length > 0) {
        throw new Error('Token tidak valid');
    }
    pool.releaseConnection(conn);

    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({
        id: decodedToken.id
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });

    return newAccessToken;
}

export const authServices = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
};