const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = (req, res, next) => {
  const autheHeader = req.headers.authorization;
  try {
    if (!autheHeader || !autheHeader.startsWith("Bearer ")) {
      throw new Error("not autherized");
    }
    const tokenStr = autheHeader.split(" ")[1];
    const decode = jwt.verify(tokenStr, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.error("Error message:", error.message);
    return res.status(403).json({ error: "not autherized" });
  }
};

module.exports = {
  authMiddleware,
};
