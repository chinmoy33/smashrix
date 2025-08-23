const express = require("express");
const router = express.Router();
const { getRegister, register, updateRegistration, deleteRegistration, toggleEligibility} = require("../controllers/registrationControllers");

router.get("/", getRegister);

router.post("/registerEvent/:id", register)

router.post("/updateRegistration/:id",updateRegistration);

router.delete("/deleteRegistration/:id", deleteRegistration);

router.post("/toggleEligibility/:id", toggleEligibility);

module.exports = router;