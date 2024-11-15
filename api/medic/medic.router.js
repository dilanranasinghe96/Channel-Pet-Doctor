const { createUser, deleteUser, login, getUserByID, getUsers, updateUser } = require("./medic.controller");
const express = require("express");
const router = express.Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.delete("/", checkToken, deleteUser);
router.get("/:id",checkToken,  getUserByID);
router.get("/", checkToken, getUsers);
router.patch("/",checkToken, updateUser);
router.post("/login", login);

module.exports = router;
