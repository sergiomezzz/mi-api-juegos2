/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Acceso denegado, token requerido" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

module.exports = auth;
