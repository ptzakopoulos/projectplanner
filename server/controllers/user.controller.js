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
  if (!body) return res.json({ ok: false, message: "Body is emtpy" });
  try {
    const updatedBody = await setOrUpdateLinkIcons(body);
    const newProject = new Project(updatedBody);
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
  body.colleagues?.map((colleague) => delete colleague._id);
  try {
    const updatedBody = await setOrUpdateLinkIcons(body);
    const updated = await Project.findByIdAndUpdate(projectId, updatedBody, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Project not found" });
    }
    return res.json({
      ok: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
};
exports.saveColleague = async (req, res, next) => {
  const body = req.body;
  const colleague = {
    role: body.colleague.role,
    name: body.colleague.name,
    email: body.colleague.email,
  };
  console.log(body);
  if (!colleague)
    return res
      .status(404)
      .json({ ok: false, message: "Error, colleague was not found." });
  try {
    const colleagueExists = await Colleague.findOne({ email: body.email });
    if (colleagueExists)
      return res.status(401).json({
        ok: false,
        message: "Colleague with this email already exists.",
      });
    const saved = await new Colleague(colleague).save();
    if (!saved)
      return res.status(500).json({ ok: false, message: "Server error." });
    return res
      .status(200)
      .json({ ok: true, message: "Colleague was saved succesfully!" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
exports.getColleagues = async (req, res, next) => {
  try {
    const colleagues = await Colleague.find();
    return res.status(200).json(colleagues);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
