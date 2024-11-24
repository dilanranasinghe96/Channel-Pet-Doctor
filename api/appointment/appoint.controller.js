const { genSaltSync, hashSync , compareSync} = require("bcrypt");
const {
create, 
getUserByID,
deleteUser,
getUsers,
updateUser,
getUserByLocation
} = require("./appoint.service");

const {sign} = require("jsonwebtoken");

module.exports ={
    createUser : (req, res) => {
        try {
            // Extract data from request
            const data = {
                name: req.body.name,
                contact: req.body.contact,
                location: req.body.location,
                message: req.body.message,
                animal_image: req.file ? req.file.filename : null, // Store file name for reference
                appointment_datetime: req.body.appointment_datetime,
                status: 'pending', // Default status
                doctor_updated_by: null, // Initially no doctor update
            };
    
            // Validate required fields
            if (!data.name || !data.contact || !data.location || !data.message || !data.appointment_datetime) {
                return res.status(400).json({
                    success: 0,
                    message: 'Missing required fields.',
                });
            }
    
            // Call database insertion function
            create(data, (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        success: 0,
                        message: 'Database connection error.',
                    });
                }
                return res.status(201).json({
                    success: 1,
                    message: 'Appointment created successfully!',
                    data: results,
                });
            });
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({
                success: 0,
                message: 'Internal server error.',
            });
        }
    },
    getUserByID: (req, res) => {
        getUserByID(req.params.id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "result not Found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: "User Deleted Successfully"
            });
        });
    },
    
// Update controller function
updateUser: (req, res) => {
    const body = req.body;
    
    // Ensure required fields are provided
    if (!body.id || !body.status || !body.updated_by) {
        return res.status(400).json({
            success: 0,
            message: "Missing required fields (id, status, updated_by).",
        });
    }

    // Call the update service
    updateUser(body, (err, results) => {
        if (err) {
            console.error("Error updating appointment:", err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error.",
            });
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: "Appointment not found or no changes made.",
            });
        }

        // Successful update
        return res.status(200).json({
            success: 1,
            message: "Appointment updated successfully.",
        });
    });
},

    getUsers:(req, res)=>{
        getUsers((err, results)=>{
            if(err){
                console.log(err)
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        });
    },
    locationFilter: (req, res)=>{
        const body = req.body;
        getUserByLocation(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid Email or Password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login Successfully",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid Email or Password"
                });
            }
        })
    }
}