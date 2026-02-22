import express, { Router } from "express";
import { createCategory, deleteCategories, getCategories, moidfyCategories } from "../controller/categoryController.js";

const router = express.Router();

router.post("/post", createCategory);
router.get("/get", getCategories);
router.put("/update/:id", moidfyCategories);
router.delete("/delete/:id", deleteCategories);

export default router;
