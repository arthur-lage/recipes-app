import { Router } from "express";

import { recipeController } from "../controllers/recipeController";

const router = Router();

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.get("/saved/:userId", recipeController.getSavedRecipes);
router.post("/", recipeController.createRecipe);
router.patch("/saved", recipeController.saveRecipe);
router.delete("/", recipeController.deleteRecipes);
router.delete("/:id", recipeController.deleteRecipeById);

export { router as recipeRouter };
