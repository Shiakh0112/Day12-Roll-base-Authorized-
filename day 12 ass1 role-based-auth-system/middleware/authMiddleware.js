const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("./jwtBlacklist");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized access" });

  try {
    if (await isTokenBlacklisted(token)) {
      return res.status(403).json({ error: "Token blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
