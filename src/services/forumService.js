import { pool } from "../config/configDB.js";

async function getAllForums() {
    const conn = await pool.getConnection();

    const [forums] = await conn.query(
        'SELECT f.id, CONCAT(u.fname, " ", u.lname) as fullname, u.photo, f.title, f.slug, f.content, f.created_at, f.updated_at, SUM(DISTINCT r.id) AS reply_count FROM forums f INNER JOIN users u ON f.user_id = u.id INNER JOIN replies r ON f.id = r.forum_id GROUP BY f.id'
    );

    if (forums) {
        for (let forum of forums) {
            const [tags] = await conn.query(
                'SELECT t.id, t.slug, t.name FROM tags t INNER JOIN forum_tags ft WHERE t.id = ft.tag_id AND ft.forum_id = ?',
                [forum.id]
            );
            forum.tags = tags;
        }
    } else {
        throw new Error('Forum tidak ditemukan');
    }

    pool.releaseConnection(conn);
    return forums;
}

async function getForumById(id) {
    const conn = await pool.getConnection();

    const [forum] = await conn.query(
        'SELECT f.id, CONCAT(u.fname, " ", u.lname) as fullname, u.photo, f.title, f.slug, f.content, f.created_at, f.updated_at, SUM(DISTINCT r.id) AS reply_count FROM forums f INNER JOIN users u ON f.user_id = u.id INNER JOIN replies r ON f.id = r.forum_id WHERE f.id = ? GROUP BY f.id',
        [id]
    );

    if(forum.length !== 0) {
        const [tags] = await conn.query(
            'SELECT t.id, t.slug, t.name FROM tags t INNER JOIN forum_tags ft WHERE t.id = ft.tag_id AND ft.forum_id = ?',
            [forum[0].id]
        );
        forum[0].tags = tags;
    }

    pool.releaseConnection(conn);
    return forum[0];
}

export const forumServices = {
    getAllForums,
    getForumById
}