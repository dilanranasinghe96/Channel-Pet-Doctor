const { createMedicine, deleteUser, login, getUserByID, getUsers, updateUser } = require("./medic.controller");
const express = require("express");
const router = express.Router();
const { checkToken } = require("../../auth/token_validation");

const upload = require("../../config/multer"); 
router.post("/",checkToken, upload.fields([
    { name: 'bill', maxCount: 1 },
    { name: 'mediafile', maxCount: 1 }
  ]),createMedicine);
router.delete("/", checkToken, deleteUser);
router.get("/:id",checkToken,  getUserByID);
router.get("/", checkToken, getUsers);
router.patch("/",checkToken, updateUser);
router.post("/login", login);

module.exports = router;
