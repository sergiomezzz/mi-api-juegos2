const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del juego
 *           example: "64b7f9c2e4b0f5a9d8e7c456"
 *         title:
 *           type: string
 *           description: Título del juego
 *           example: "Mi juego"
 *         description:
 *           type: string
 *           description: Descripción del juego
 *           example: "Descripción del juego"
 *         user:
 *           type: string
 *           description: ID del usuario propietario del juego
 *           example: "64b7f9c2e4b0f5a9d8e7c123"
*         genre:
 *           type: string
 *           description: Género del juego
 *           example: "Aventura"
 */

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
genre: { type: String }, // Added genre field
}, { timestamps: true });

module.exports = mongoose.model("Games", gameSchema);
