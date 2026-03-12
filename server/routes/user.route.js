const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/createProject",
  authMiddleware.userTokenValidation,
  controllers.createProject,
);
router.get(
  "/getMyProjects",
  authMiddleware.userTokenValidation,
  controllers.getUserProjects,
);
router.get(
  "/getProjectById/:id",
  authMiddleware.userTokenValidation,
  controllers.getProjectById,
);
router.post(
  "/deleteProject",
  authMiddleware.userTokenValidation,
  controllers.deleteProject,
);
router.post(
  "/editProject/:id",
  authMiddleware.userTokenValidation,
  controllers.editProject,
);
router.post(
  "/saveColleague",
  authMiddleware.userTokenValidation,
  controllers.saveColleague,
);
router.get(
  "/getColleagues",
  authMiddleware.userTokenValidation,
  controllers.getColleagues,
);
router.post(
  "/deleteColleague",
  authMiddleware.userTokenValidation,
  controllers.deleteColleague,
);

module.exports = router;
