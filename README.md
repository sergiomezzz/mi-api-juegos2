# Mi API de Juegos

## Integrante
- **Nombre:** Sergio Gomez
- **Correo:** sergio.gomezo5@uptc.edu.co

## Descripción General
Esta API permite la gestión de usuarios y videojuegos, permitiendo la creación, consulta, actualización y eliminación de registros. Está diseñada para facilitar la interacción con una base de datos de juegos y usuarios, proporcionando endpoints organizados y documentados con Swagger.

## URL de la API
El servicio está desplegado en Render y se puede acceder a la documentación en la siguiente URL:
[Documentación Swagger](https://mi-api-juegos2.onrender.com/api/docs/)

## Instalación y Ejecución
### Prerrequisitos
- Node.js instalado 
- MongoDB como base de datos

### Pasos para ejecutar localmente
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sergiomezzz/mi-api-juegos2
   cd mi-api-juegos2
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno en un archivo `.env`:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/mi-api-juegos
   PORT=3000
   ```
4. Ejecutar el servidor:
   ```bash
   npm start
   ```

## Endpoints Principales
### Usuarios
- `POST /api/users/register` - Registrar un nuevo usuario.
- `POST /api/users/login` - Iniciar sesión.
- `GET /usuarios` - Obtener todos los usuarios.
- `GET /usuarios/********:id` - Obtener un usuario por ID.
- `PUT /usuarios/********:id` - Actualizar un usuario.
- `DELETE /usuarios/********:id` - Eliminar un usuario.

### Juegos
- `GET /games `- Obtener todos los juegos del usuario autenticado.
- `POST /games` - Crear un nuevo juego.
- `GET /games/********:id` - Obtener un juego por ID.
- `PUT /games/********:id` - Actualizar un juego.
- `DELETE /games/********:id` - Eliminar un juego.


## Tecnologías Utilizadas
- Node.js con Express.js
- MongoDB con Mongoose
- Swagger para documentación
- Render para despliegue en la nube

## Contribución
Si deseas contribuir, puedes hacer un fork del repositorio y enviar un pull request con tus mejoras.

## Licencia
Este proyecto se encuentra bajo la licencia MIT.

