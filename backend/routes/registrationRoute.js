const express = require("express");
const router = express.Router();
const { getRegister, register, updateRegister, deleteRegister} = require("../controllers/registerControllers");

router.get("/", getRegister);

router.post("/register", register)

router.post("/updateRegister/:id",updateRegister);

router.delete("/deleteRegister/:id", deleteRegister);

module.exports = router;