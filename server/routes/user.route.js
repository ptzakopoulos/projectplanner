const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user.controller");

router.post("/createProject", controllers.createProject);
router.get("/getMyProjects", controllers.getUserProjects);
router.get("/getProjectById/:id", controllers.getProjectById);
router.post("/deleteProject", controllers.deleteProject);
router.post("/editProject/:id", controllers.editProject);
router.post("/saveColleague", controllers.saveColleague);
router.get("/getColleagues", controllers.getColleagues);

module.exports = router;
