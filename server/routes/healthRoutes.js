import express from "express";
import { checkHealth } from "../utils/healthCheck.js";

const router = express.Router();

//Routes for health check
router.get("/check", checkHealth);

export default router;
