const express = require("express");
const Game = require("../models/Game");
const auth = require("../middleware/auth");

const router = express.Router();

// Obtener todas los juegos del usuario autenticado
/**
 * @swagger
 * /games:
 *   get:
 *     tags: [Games]
 *     summary: Obtener todas los juegos del usuario autenticado
 *     description: Retorna un listado de todas los juegos asociadas al usuario actualmente autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de juegos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/", auth, async (req, res) => {
    try {
    const games = await Game.find({ user: req.user.id }); // Busca todas los juegos del usuario autenticado
    res.json(games);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo juegos"+error });
  }
});

// Crear un juego
/**
 * @swagger
 * /games:
 *   post:
 *     tags: [Games]
 *     summary: Crear un nuevo juego
 *     description: Crea un nuevo juego asociado al usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del juego
 *                 example: "Mi juego"
 *               description:
 *                 type: string
 *                 description: Descripción del juego
 *                 example: "Descripción del juego"
 *     responses:
 *       201:
 *         description: Juego creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ msg: "El título es obligatorio" });

    const newGame = new Game({ title, description, user: req.user.id });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el juego" });
  }
});

// Actualizar un juego
/**
 * @swagger
 * /games/{id}:
 *   put:
 *     tags: [Games]
 *     summary: Actualizar un juego existente
 *     description: Actualiza los datos de un juego asociado al usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del juego
 *                 example: "Nuevo título"
 *               description:
 *                 type: string
 *                 description: Nueva descripción del juego
 *                 example: "Nueva descripción"
 *     responses:
 *       200:
 *         description: Juego actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Juego no encontrado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ msg: "juego no encontrado" });
    if (game.user.toString() !== req.user.id) return res.status(403).json({ msg: "Acceso denegado" });

    game.title = req.body.title || game.title;
    game.description = req.body.description || game.description;
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ msg: "Error actualizando el juego" });
  }
});

// Eliminar un juego
/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     tags: [Games]
 *     summary: Eliminar un juego
 *     description: Elimina un juego asociado al usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego a eliminar
 *     responses:
 *       200:
 *         description: Juego eliminado exitosamente
 *       404:
 *         description: Juego no encontrado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ msg: "juego no encontrado" });
    if (game.user.toString() !== req.user.id) return res.status(403).json({ msg: "Acceso denegado" });

    await game.deleteOne();
    res.json({ msg: "juego eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error eliminando el juego" });
  }
});

// Obtener un juego por ID

module.exports = router;
  