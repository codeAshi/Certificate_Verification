const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecretkey";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Access Denied" });

  // Support both raw token and Bearer token
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
}

function verifyAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin Access Only" });

  next();
}

module.exports = { verifyToken, verifyAdmin };