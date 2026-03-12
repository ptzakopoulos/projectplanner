const jwt = require("jsonwebtoken");

exports.userTokenValidation = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ ok: false, message: "No token" });
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ ok: false, message: "Your session has expired." });
  }
};
