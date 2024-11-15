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
            const data = {
                name: req.body.name,
                contact: req.body.contact,
                location: req.body.location,
                message: req.body.message,
                mediafile: req.file ? req.file.filename : null, // Save uploaded file name
            };
    
            console.log("Data being inserted:", data);
    
            create(data, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database Connection Error",
                    });
                }
    
                return res.status(200).json({
                    success: 1,
                    data: results,
                });
            });
        } catch (err) {
            return res.status(400).json({
                success: 0,
                message: err.message,
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
    
    updateUser: (req, res) => { 
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed To Update User"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "update Successfully"
            })
        })
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