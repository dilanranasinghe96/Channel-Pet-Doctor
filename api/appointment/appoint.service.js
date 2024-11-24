const pool = require("../../config/db");

module.exports = {
     create : (data, callBack) => {
        console.log('Data being inserted:', data);
        if (!data.name || !data.contact || !data.location || !data.message) {
            return callBack(new Error('Missing required fields'));
        }
    
        pool.query(
            `INSERT INTO appointment (name, contact, message, animal_image, appointment_datetime, location) VALUES (?, ?, ?, ?, ?,?)`,
            [
                data.name,
                data.contact,
                data.message,
                data.animal_image,
                data.appointment_datetime,
                data.location,
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

// Update service function
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE appointment SET status = ?, updated_by = ? WHERE id = ?`,
            [
                data.status,         // New status value
                data.updated_by,     // Doctor's name or ID
                data.id              // Appointment ID
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error); // Handle query errors
                }
                return callBack(null, result); // Successful update
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
