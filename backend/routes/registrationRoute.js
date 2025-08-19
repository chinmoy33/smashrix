const express = require("express");
const router = express.Router();
const { getRegister, register, updateRegister, deleteRegister} = require("../controllers/registrationControllers");

router.get("/", getRegister);

router.post("/registerEvent/:id", register)

router.post("/updateRegister/:id",updateRegister);

router.delete("/deleteRegister/:id", deleteRegister);

module.exports = router;