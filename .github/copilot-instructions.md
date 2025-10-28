# Copilot Instructions for SastaFlipcart

## Project Overview
This is a Node.js/Express backend for an e-commerce platform. The codebase is organized for modularity and clarity, using Express for routing and Mongoose for MongoDB integration.

## Architecture & Key Components
- **Entry Point:** `server.js` initializes Express, loads environment variables, connects to MongoDB, and starts the server.
- **Database:** Connection logic is in `src/config/db.js`, using `mongoose.connect` with `process.env.MONGO_URI`.
- **Models:** Place Mongoose schemas in `src/models/`. Example: `user.model.js` (incomplete), `product.model.js` (empty).
- **Controllers:** Business logic should be in `src/controllers/`. Example: `auth.controllers.js` (empty).
- **Routes:** Define Express routes in `src/routes/`. Example: `auth.routes.js` (empty).

## Developer Workflows
- **Start Server:**
  ```bash
  node server.js
  ```
  The server uses the port from `.env` (`PORT`) or defaults to 4000.
- **Environment Variables:**
  - `.env` must define `MONGO_URI` for database connection.
- **Dependencies:**
  - Express, Mongoose, Dotenv (see `package.json`).
- **Testing:**
  - No tests or test framework are currently set up. The `test` script in `package.json` is a placeholder.

## Patterns & Conventions
- **Modular Structure:**
  - Keep models, controllers, and routes in their respective folders under `src/`.
- **Async/Await:**
  - Use async/await for database operations (see `db.js`).
- **Error Handling:**
  - Log errors to the console. No custom error middleware yet.
- **Configuration:**
  - All config (DB, environment) is loaded at startup in `server.js`.

## Integration Points
- **MongoDB:**
  - Connects using Mongoose. Connection string from `.env`.
- **Express Middleware:**
  - Uses `express.json()` for JSON body parsing.

## Examples
- **Connecting to DB:** See `src/config/db.js`.
- **Starting the server:** See `server.js`.

## Recommendations for AI Agents
- Follow the folder structure for new features.
- Implement missing models, controllers, and routes as needed.
- Add error handling and validation where appropriate.
- If adding tests, set up a test framework (e.g., Jest, Mocha) and update `package.json`.

---
_If any section is unclear or incomplete, please provide feedback for further refinement._
