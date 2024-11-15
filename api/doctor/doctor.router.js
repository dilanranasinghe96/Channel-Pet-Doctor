const { createUser, deleteUser, login,getUserByID,getUsers,updateUser } = require("./doctor.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../auth/token_validation"); 

router.post("/", createUser);
router.delete("/",verifyToken, deleteUser);
router.get("/:id",verifyToken, getUserByID);
router.get("/", verifyToken,getUsers);
router.patch("/",verifyToken, updateUser);
router.post("/login",login)

module.exports = router