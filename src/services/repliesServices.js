import { pool } from "../config/configDB.js";

async function getRepliesByForumId(forum_id) {
    const conn = await pool.getConnection();
    const [replies] = await conn.query(
        'SELECT replies.id, users.photo, CONCAT(users.fname, " ", users.lname) as fullname, replies.content, replies.created_at, replies.updated_at FROM replies INNER JOIN users WHERE replies.user_id = users.id AND replies.forum_id = ?',
        [forum_id]
    );
    pool.releaseConnection(conn);
    return replies;
}

export const repliesServices = {
    getRepliesByForumId
}