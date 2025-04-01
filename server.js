require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./config/db.js");
const Game = require("./models/Game.js");

const gameRoutes = require("./routes/gameRoutes.js");
const userRoutes = require("./routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(express.json()); // Para recibir JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
app.use(methodOverride("_method")); // Para manejar PUT y DELETE en formularios

// Rutas de API
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Página principal con los juegos
app.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.render("index", { games });
  } catch (error) {
    res.status(500).send("Error al cargar los juegos.");
  }
});

// Iniciar servidor solo si la DB se conecta
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
