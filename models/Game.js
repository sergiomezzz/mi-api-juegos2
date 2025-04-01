const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: ID único generado automáticamente por MongoDB
 *           readOnly: true
 *           example: "64b7f9c2e4b0f5a9d8e7c456"
 *         title:
 *           type: string
 *           description: Título del juego
 *           example: "The Legend of Zelda"
 *         description:
 *           type: string
 *           description: Descripción detallada del juego
 *           example: "Un juego de aventura épica"
 *         user:
 *           type: string
 *           description: ID del usuario propietario del juego
 *           example: "64b7f9c2e4b0f5a9d8e7c123"
 *         genre:
 *           type: string
 *           description: Género principal del juego
 *           example: "Aventura"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación automática
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           readOnly: true
 */
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  genre: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);