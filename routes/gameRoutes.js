const express = require("express");
const Game = require("../models/Game");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Gestión de videojuegos del usuario
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Obtener todos los juegos del usuario
 *     tags: [Games]
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
 *         description: No autorizado (token inválido o no proporcionado)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", auth, async (req, res) => {
    try {
        const games = await Game.find({ user: req.user.id });
        res.json(games);
    } catch (error) {
        res.status(500).json({ msg: "Error obteniendo juegos: " + error.message });
    }
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Crear un nuevo juego
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "The Legend of Zelda"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "Un juego de aventura épica"
 *               genre:
 *                 type: string
 *                 example: "Aventura"
 *     responses:
 *       201:
 *         description: Juego creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", auth, async (req, res) => {
    try {
        const { title, description, genre } = req.body;
        if (!title) return res.status(400).json({ msg: "El título es obligatorio" });

        const newGame = new Game({ 
            title, 
            description, 
            genre,
            user: req.user.id 
        });
        
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ msg: "Error al crear el juego: " + error.message });
    }
});

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Actualizar un juego existente
 *     tags: [Games]
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
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Nuevo título del juego"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "Nueva descripción del juego"
 *               genre:
 *                 type: string
 *                 example: "Nuevo género"
 *     responses:
 *       200:
 *         description: Juego actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Datos de entrada inválidos
 *       403:
 *         description: No tienes permiso para modificar este juego
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", auth, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ msg: "Juego no encontrado" });
        if (game.user.toString() !== req.user.id) return res.status(403).json({ msg: "Acceso denegado" });

        game.title = req.body.title || game.title;
        game.description = req.body.description || game.description;
        game.genre = req.body.genre || game.genre;
        
        await game.save();
        res.json(game);
    } catch (error) {
        res.status(500).json({ msg: "Error actualizando el juego: " + error.message });
    }
});

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Eliminar un juego
 *     tags: [Games]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Juego eliminado correctamente"
 *       403:
 *         description: No tienes permiso para eliminar este juego
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", auth, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ msg: "Juego no encontrado" });
        if (game.user.toString() !== req.user.id) return res.status(403).json({ msg: "Acceso denegado" });

        await game.deleteOne();
        res.json({ msg: "Juego eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error eliminando el juego: " + error.message });
    }
});

module.exports = router;