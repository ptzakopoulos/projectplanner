const User = require("../models/user.model");
const Project = require("../models/project.model");

exports.createProject = async (req, res, next) => {
  const body = req.body;
  if (!body) return res.json({ ok: false, message: "Body is emtpy" });
  try {
    const newProject = new Project(body);
    console.log(newProject);
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
