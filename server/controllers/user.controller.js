const User = require("../models/user.model");
const Project = require("../models/project.model");

exports.createProject = async (req, res, next) => {
  const body = req.body;
  if (!body) return res.json({ ok: false, message: "Body is emtpy" });
  try {
    const newProject = new Project(body);
    await newProject.save();
    return res.json({ message: "Project was created succesfully" });
  } catch (err) {
    res.json({ ok: false, message: "Error", error: err });
  }
};
exports.getUserProjects = async (req, res, next) => {
  const userId = req.params.id;
  try {
    // const user = await User.findById(userId);
    // if(!user) res.json({ok:false, message: 'User does noy exist.'});
    // const projects = await Project.find({userId : user.id});
    // res.json(projects);
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    throw err;
  }
};
exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project)
      res.json({ ok: false, message: "Project does not exist", status: 404 });
    res.json(project);
  } catch (err) {
    throw err;
  }
};
exports.deleteProject = async (req, res, next) => {
  const body = req.body;
  if (!body) return res.json({ ok: false, message: "Body not found." });
  const id = body.id;
  if (!id) return res.json({ ok: false, message: "Id not found" });
  try {
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        ok: false,
        message: "Project not found",
      });
    }
    return res.json({
      ok: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};
exports.editProject = async (req, res, next) => {
  const projectId = req.params.id;
  const body = req.body;
  try {
    await Project.findByIdAndUpdate(projectId, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({
        ok: false,
        message: "Project not found",
      });
    }

    return res.json({
      ok: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};
