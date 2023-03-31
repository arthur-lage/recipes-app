import { Request, Response } from "express";

import { RecipeModel } from "../models/Recipe";

import { z } from "zod";
import { UserModel } from "../models/User";

export const recipeController = {
  async getRecipes(req: Request, res: Response) {
    try {
      const recipes = await RecipeModel.find();

      return res.status(200).json({ recipes });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async getRecipeById(req: Request, res: Response) {
    try {
      const getRecipeByIdParams = z.object({
        id: z.string(),
      });

      const { id } = getRecipeByIdParams.parse(req.params);

      const recipe = await RecipeModel.findById(id);

      return res.status(200).json({ recipe });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async getSavedRecipes(req: Request, res: Response) {
    try {
      const getSavedRecipes = z.object({
        userId: z.string(),
      });

      const { userId } = getSavedRecipes.parse(req.params);

      const currentUser = await UserModel.findById(userId);

      if (!currentUser) {
        return res.status(400).json({
          message: "Could not find user.",
        });
      }

      const savedRecipes = await RecipeModel.find({
        _id: { $in: currentUser.savedRecipes },
      });

      return res.status(200).json({ savedRecipes });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async createRecipe(req: Request, res: Response) {
    try {
      const createRecipeBody = z.object({
        name: z.string(),
        ingredients: z.string().array(),
        instructions: z.string(),
        cookingTime: z.number(),
        ownerUser: z.string(),
        image: z.string().url(),
      });

      const { name, ingredients, instructions, cookingTime, ownerUser, image } =
        createRecipeBody.parse(req.body);

      const newRecipe = new RecipeModel({
        name,
        ingredients,
        instructions,
        cookingTime,
        ownerUser,
        image,
      });

      await newRecipe.save();

      return res.status(201).json({ message: "Recipe created successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async deleteRecipes(req: Request, res: Response) {
    try {
      await RecipeModel.deleteMany();

      return res.status(200).json({ message: "Recipes deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async deleteRecipeById(req: Request, res: Response) {
    try {
      const deleteRecipeByIdParams = z.object({
        id: z.string(),
      });

      const { id } = deleteRecipeByIdParams.parse(req.params);

      await RecipeModel.findByIdAndRemove(id);

      return res.status(200).json({ message: "Recipe deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
  async saveRecipe(req: Request, res: Response) {
    try {
      const saveRecipeBody = z.object({
        userId: z.string(),
        recipeId: z.string(),
      });

      const { userId, recipeId } = saveRecipeBody.parse(req.body);

      await UserModel.findByIdAndUpdate(userId, {
        $push: {
          savedRecipes: recipeId,
        },
      });

      return res.status(200).json({ message: "Recipe saved successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  },
};
