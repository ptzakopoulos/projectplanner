const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const body = req.body;
  const email = body.email;
  try {
    const existingUser = await User.findOne((user) => user.email === email);
    if (existingUser) res.json({ ok: false, message: "User already exists." });
    const userProps = {
      name: body.name,
      email: body.email,
      password: body.password,
    };
    const newUser = new User(userProps);
    newUser.save();
    res.json({ id: newUser.id });
  } catch (err) {
    throw err;
  }
};
