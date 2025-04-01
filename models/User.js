const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario
 *           example: "64b7f9c2e4b0f5a9d8e7c123"
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *           example: "usuario123"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: "usuario@example.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario (encriptada)
 *           example: "$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4lYzFZx3Zx3Zx3Zx3Zx"
 */

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor, usa un email válido"],
    },
    password: { type: String, required: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }], // Relación inversa (opcional)
  },
  { timestamps: true }
);

// Encripta la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
