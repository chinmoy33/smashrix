const express = require("express");
const router = express.Router();
const { getMatches,saveMatches,toggleCompleted,clearMatches} = require("../controllers/matchControllers");

router.get("/getMatches", getMatches);

router.post("/saveMatches", saveMatches);

router.post("/toggleCompleted/:id", toggleCompleted);

router.delete("/clearMatches", clearMatches)

module.exports = router;