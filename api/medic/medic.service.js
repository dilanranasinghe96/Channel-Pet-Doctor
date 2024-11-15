const pool = require("../../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO medicine_list (user_id,medicine_name, dosage, bill,mediafile) VALUES (?, ?, ?, ?, ?)`,
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
            `SELECT * FROM medicine_list`,
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
            `SELECT * FROM medicine_list WHERE id = ?`,
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
            `SELECT * FROM medicine_list WHERE email = ?`,
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
            `UPDATE medicine_list SET name = ?, email = ?, password = ? WHERE id = ?`, // Removed extra comma
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
            `DELETE FROM medicine_list WHERE id = ?`,
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
