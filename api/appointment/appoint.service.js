const pool = require("../../config/db");

module.exports = {
     create : (data, callBack) => {
        console.log('Data being inserted:', data);
        if (!data.name || !data.contact || !data.location || !data.message) {
            return callBack(new Error('Missing required fields'));
        }
    
        pool.query(
            `INSERT INTO appointment (name, contact, location, message, mediafile) VALUES (?, ?, ?, ?, ?)`,
            [
                data.name,
                data.contact,
                data.location,
                data.message,
                data.mediafile,
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
            `SELECT * FROM appointment`,
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
            `SELECT * FROM appointment WHERE id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    },

    getUserByLocation: (email, callBack) => {
        pool.query(
            `SELECT * FROM appointment WHERE location = ?`,
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
            `UPDATE appointment SET name = ?, email = ?, password = ? WHERE id = ?`, // Removed extra comma
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
            `DELETE FROM appointment WHERE id = ?`,
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
