import express from "express";
import {
  createP,
  getAllP,
  getPById,
  removeP,
  updateP,
} from "../controllers/product";
import { checkAuth } from "../middlewares/checkauth";

const router = express.Router();

router.post("/products", checkAuth, createP);
router.get("/products", getAllP);
router.get("/products/:id", getPById);
router.put("/products/:id", checkAuth, updateP);
router.delete("/products/:id", checkAuth, removeP);

export default router;
