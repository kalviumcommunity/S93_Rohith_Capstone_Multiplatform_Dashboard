
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Platform = require("./models/Platform");
const Content = require("./models/Content");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Check server and database status
app.get("/api/health", (req, res) => {
  res.json({
    server: "running",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected",
  });
});

// Reusable CRUD routes for a Mongoose model
function registerCrudRoutes(path, Model) {
  const router = express.Router();

  // READ all records
  router.get("/", async (req, res, next) => {
    try {
      const records = await Model.find().sort({ createdAt: -1 });
      res.json(records);
    } catch (error) {
      next(error);
    }
  });

  // READ one record
  router.get("/:id", async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid record ID" });
      }

      const record = await Model.findById(req.params.id);

      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  // CREATE a record
  router.post("/", async (req, res, next) => {
    try {
      const record = await Model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  });

  // UPDATE a record
  router.put("/:id", async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid record ID" });
      }

      const { _id, __v, createdAt, updatedAt, ...updates } = req.body;

      const record = await Model.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );

      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  // DELETE a record
  router.delete("/:id", async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid record ID" });
      }

      const record = await Model.findByIdAndDelete(req.params.id);

      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.json({ message: "Record deleted successfully", record });
    } catch (error) {
      next(error);
    }
  });

  app.use(`/api/${path}`, router);
}

// Register routes for all three collections
registerCrudRoutes("users", User);
registerCrudRoutes("platforms", Platform);
registerCrudRoutes("content", Content);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Handle database validation and other errors
app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid field value" });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      error: "A record with this unique value already exists",
    });
  }

  res.status(500).json({ error: "Internal server error" });
});

// Connect to MongoDB before starting the server
async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from server/.env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
