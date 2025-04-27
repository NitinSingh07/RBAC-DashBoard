const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        message: "Access denied. Required role: " + allowedRoles.join(" or "),
      });
    }
  };
};

module.exports = roleCheck;
