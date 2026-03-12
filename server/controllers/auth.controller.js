require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const body = req.body;
  const role = body.role;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  if (!role || !email || !password)
    return res
      .status(400)
      .json({ ok: false, message: "Missing required fields." });
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ ok: false, message: "User already exists." });
    const encryptedPassword = await bcrypt.hash(password, 12);
    if (!encryptedPassword)
      return res.status(500).json({ ok: false, message: "Server error." });
    const userProps = {
      role: role,
      name: name,
      email: email,
      password: encryptedPassword,
    };
    const newUser = new User(userProps);
    const savedUser = await newUser.save();
    if (!savedUser)
      return res.status(500).json({ ok: false, message: "Server error." });

    return res.json({
      ok: true,
      message: "User was succesfully created!",
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Server error." });
    throw err;
  }
};
exports.login = async (req, res, next) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  if (!email || !password)
    return res
      .status(400)
      .json({ ok: false, message: "Missing required fields." });
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({ ok: false, message: "Wrong credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ ok: false, message: "Wrong credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ ok: true, message: "Succesfully loged in!", data: { token } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, message: "Server error." });
  }
};
