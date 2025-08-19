const express = require("express");
const router = express.Router();
const { getHostedEvents, hostEvent, updateEvent, deleteEvent} = require("../controllers/hostControllers");

router.get("/", getHostedEvents);

router.post("/hostEvent", hostEvent)

router.post("/updateEvent/:id",updateEvent);

router.delete("/deleteEvent/:id", deleteEvent);

module.exports = router;