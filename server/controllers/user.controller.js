const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Colleague = require("../models/colleagues.model");

const getURLIconByAI = async (url) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Οικονομικό και γρήγορο
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that returns only a single keyword representing a Google Material Symbols & Icons icon name for fontawesome based on a URL. Example: amazon.com -> shopping_cart, github.com -> code_blocks.",
        },
        { role: "user", content: `Suggest an icon name for this URL: ${url}` },
      ],
      max_tokens: 10,
    });

    const iconName = response.choices[0].message.content.trim().toLowerCase();
    if (!iconName) return null;
    return iconName;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const setOrUpdateLinkIcons = async (body) => {
  const linksHaveIcons = body?.links?.every(
    (link) => link.AIIcon && link.AIIcon !== "link",
  );
  if (body?.links && body.links.length > 0 && !linksHaveIcons) {
    body.links = await Promise.all(
      body.links.map(async (link) => {
        if (link.AIIcon) return link;
        let icon = await getURLIconByAI(link.url);
        icon = icon.replace(" ", "_");
        icon = icon.replace("-", "_");
        return {
          ...link,
          AIIcon: icon || "link",
        };
      }),
    );
  }
  return body;
};
exports.createProject = async (req, res, next) => {
  const body = req.body;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ ok: false, message: "No token" });
  if (!body)
    return res
      .status(400)
      .json({ ok: false, message: "Something went wrong." });
  if (!body.title || !body.description || !body.deadline)
    return res
      .status(400)
      .json({ ok: false, message: "Required fields are missing." });
  try {
    const updatedBody = await setOrUpdateLinkIcons(body);
    const newProject = new Project({ ...updatedBody, userId });
    await newProject.save();
    return res
      .status(200)
      .json({ ok: true, message: "Project was created succesfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};
exports.getUserProjects = async (req, res, next) => {
  const userId = req.userId;
  if (!userId)
    return res.status(401).json({ ok: false, message: "Anuthorized action." });
  try {
    const projects = await Project.find({ userId: userId });
    if (!projects)
      return res
        .status(404)
        .json({ ok: false, messalge: "No projects found." });
    if (projects.length == 0)
      return res
        .status(200)
        .json({ ok: true, message: "Empty project list.", data: [] });
    return res.status(200).json({
      ok: true,
      message: "Projects were retrieved succesfully!",
      data: projects,
    });
  } catch (err) {
    throw err;
  }
};
exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.userId;
  try {
    const project = await Project.findById(projectId);
    if (project.userId !== userId)
      return res.status(401).json({
        ok: false,
        message: "This project does not belong to this user.",
      });
    if (!project)
      return res.status(404).json({
        ok: false,
        message: "Project does not exist",
      });
    return res.status(200).json({
      ok: true,
      message: "Project was retrieved succesfully!",
      data: project,
    });
  } catch (err) {
    throw err;
  }
};
exports.deleteProject = async (req, res, next) => {
  const body = req.body;
  if (!body) return res.json({ ok: false, message: "Body not found." });
  const userId = req.userId;
  if (!userId)
    return res
      .status(401)
      .json({ ok: false, message: "User should be logged in." });
  const id = body.id;
  if (!id) return res.json({ ok: false, message: "Id not found" });
  try {
    // const deleted = await Project.findByIdAndDelete(id);
    const deleted = await Project.findOneAndDelete({ _id: id, userId });
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
  const userId = req.userId;
  if (!userId)
    return res
      .status(401)
      .json({ ok: false, message: "User should be logged in." });
  body.colleagues?.map((colleague) => delete colleague._id);
  try {
    const updatedBody = await setOrUpdateLinkIcons(body);
    const updated = await Project.findOneAndUpdate(
      { _id: projectId, userId },
      updatedBody,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Project not found" });
    }
    return res.json({
      ok: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, message: err.message });
  }
};
exports.saveColleague = async (req, res, next) => {
  const body = req.body;
  const userId = req.userId;
  if (!userId)
    return res
      .status(401)
      .json({ ok: false, message: "User should be logged in." });
  const colleague = {
    role: body.colleague.role,
    name: body.colleague.name,
    email: body.colleague.email,
    userId: userId,
  };
  if (!colleague)
    return res
      .status(404)
      .json({ ok: false, message: "Error, colleague was not found." });
  try {
    const colleagueExists = await Colleague.findOne({
      email: colleague.email,
      userId: colleague.userId,
    });
    if (colleagueExists) {
      return res.status(401).json({
        ok: false,
        message: "Colleague with this email already exists.",
      });
    }
    const saved = await new Colleague(colleague).save();
    console.log(saved);
    if (!saved)
      return res.status(500).json({ ok: false, message: "Server error." });

    return res
      .status(200)
      .json({ ok: true, message: "Colleague was saved succesfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
exports.getColleagues = async (req, res, next) => {
  const userId = req.userId;
  try {
    const colleagues = await Colleague.find({ userId });
    return res.status(200).json(colleagues);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
exports.deleteColleague = async (req, res, next) => {
  const body = req.body;
  const userId = req.userId;
  if (!body) return res.json({ ok: false, message: "Somewthing went wrong." });
  const colleagueId = body.colleagueId;
  if (!colleagueId)
    return res.json({ ok: false, message: "Something went wrong." });
  try {
    const targetColleague = await Colleague.findOneAndDelete({
      _id: colleagueId,
      userId,
    });
    if (!targetColleague)
      return res
        .status(404)
        .json({ ok: false, message: "Colleague was not found." });
    return res.status(200).json({
      ok: true,
      message: "Colleague was succesfully deleted.",
    });
  } catch (err) {
    console.log(err);
    return res.json({ ok: false, message: err.message });
  }
};
