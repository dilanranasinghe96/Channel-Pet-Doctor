const { createUser, deleteUser, login,getUserByID,getUsers,updateUser } = require("./user.controller");
const express = require("express");
const router = express.Router();

router.post("/", createUser);
router.delete("/", deleteUser);
router.get("/:id", getUserByID);
router.get("/", getUsers);
router.patch("/", updateUser);
router.post("/login",login)

module.exports = router