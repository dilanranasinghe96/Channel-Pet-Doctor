const pool = require("../../config/db");
const { getUserByEmail } = require("./doctor.controller");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO doctor (name, id_no, area, email, mobile_no, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.name,
                data.id_no,
                data.area,
                data.email,
                data.mobile_no,
                data.password,
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
            `SELECT * FROM doctor`,
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
            `SELECT * FROM doctor WHERE id = ?`,
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
            `SELECT * FROM doctor WHERE email = ?`,
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
            `UPDATE doctor SET name = ?, email = ?,mobile_no = ?, password = ? WHERE id = ?`, 
            [
                data.name,
                data.email,
                data.password,
                data.mobile_no,
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
            `DELETE FROM doctor WHERE id = ?`,
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
