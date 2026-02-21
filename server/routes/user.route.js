const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user.controller");

router.post("/createProject", controllers.createProject);
// router.get("/getMyProject/:id", controllers.getUserProjects);
router.get("/getMyProjects", controllers.getUserProjects);

module.exports = router;
