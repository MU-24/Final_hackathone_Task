const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

import authRouter from "./routes/auth";
import taskRouter from "./routes/tasks";

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
