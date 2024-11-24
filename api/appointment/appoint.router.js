const { createUser, deleteUser, locationFilter, getUserByID, getUsers, updateUser } = require("./appoint.controller");
const express = require("express");
const router = express.Router();
const { checkToken } = require("../../auth/token_validation");
const upload = require("../../config/multer"); 

router.post("/", checkToken, upload.single("animal_image"), createUser);
router.delete("/", checkToken, deleteUser);
router.get("/:id",checkToken,  getUserByID);
router.get("/", checkToken, getUsers);
router.patch("/",checkToken, updateUser);
router.post("/filter", checkToken, locationFilter);

module.exports = router;
