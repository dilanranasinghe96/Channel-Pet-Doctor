const pool = require("../../config/db");
const { getUserByEmail } = require("./user.controller");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [
                data.name,
                data.email,
                data.password,
                data.role
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },

    getUsers: (callBack) => {
        pool.query(
            `SELECT * FROM users`,
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },
    getUserByID: (id, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`, // Removed extra comma
            [
                data.name,
                data.email,
                data.password,
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id = ?`,
            [data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
};
