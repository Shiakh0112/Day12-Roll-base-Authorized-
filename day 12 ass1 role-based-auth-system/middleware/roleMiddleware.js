const roleMiddleware = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied for this role" });
  }
  next();
};

module.exports = roleMiddleware;
