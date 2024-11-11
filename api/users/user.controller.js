const { genSaltSync, hashSync , compareSync} = require("bcrypt");
const {
create, 
getUserByID,
deleteUser,
getUsers,
updateUser,
getUserByEmail
} = require("./user.service");

const {sign} = require("jsonwebtoken");

module.exports ={
    createUser: (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
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
                    success:0,
                    message: "Record Not Found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: "User Deleted Successfully"
            })
        })
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
    login: (req, res)=>{
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
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