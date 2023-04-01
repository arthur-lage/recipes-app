import { FormEvent, useReducer } from "react";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { createRecipeReducer } from "../reducers/createRecipeReducer";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("recipes::userId");

const createRecipeInitialState = {
  name: "",
  ingredients: [],
  instructions: "",
  image: "",
  cookingTime: 1,
  ownerUser: userId,
};

export function CreateRecipe() {
  const [recipe, recipeDispatch] = useReducer(
    createRecipeReducer,
    createRecipeInitialState
  );

  const navigate = useNavigate();

  async function handleCreateRecipe(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("/recipes", {
        ...recipe,
        cookingTime: Number(recipe.cookingTime),
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const handleInputChange = (e: any) => {
    recipeDispatch({
      type: "handle_input",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  function handleAddIngredient() {}

  return (
    <div>
      <Header />
      <main className="mt-8 flex flex-col items-center">
        <h1 className="font-nunito font-bold text-zinc-800 text-2xl">
          Create Recipe
        </h1>

        <form
          className="mt-6 flex flex-col w-full px-8 gap-5"
          onSubmit={handleCreateRecipe}
        >
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="recipe-name">Recipe Name</label>
            <input
              className="w-full border-[1px] border-blue-900 p-2 rounded-md"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={recipe.name}
              id="recipe-name"
              placeholder="Eg: Chicken Strogonoff"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span>Ingredients</span>
              <button
                className="px-2 py-1 rounded-md bg-header-gradient-end hover:brightness-125 duration-150 transition-all text-white font-semibold font-nunito"
                type="button"
                onClick={() =>
                  recipeDispatch({
                    type: "add_ingredient",
                  })
                }
              >
                Add Ingredient
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <input
                  key={index}
                  className="w-full border-[1px] border-blue-900 p-2 rounded-md"
                  value={ingredient}
                  onChange={(e) =>
                    recipeDispatch({
                      type: "handle_ingredient_input",
                      ingredientIndex: index,
                      payload: e.target.value,
                    })
                  }
                  placeholder="Type ingredient..."
                />
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="recipe-instructions">How to prepare</label>
            <textarea
              onChange={handleInputChange}
              value={recipe.instructions}
              name="instructions"
              className="w-full border-[1px] border-blue-900 p-2 rounded-md"
              id="recipe-instructions"
              placeholder="Eg: Step 1: Do this, Step 2: Do that..."
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="recipe-cooking-time">
              Cooking Time (In Minutes)
            </label>
            <input
              onChange={handleInputChange}
              className="w-full border-[1px] border-blue-900 p-2 rounded-md"
              type="number"
              value={recipe.cookingTime}
              name="cookingTime"
              min={1}
              max={1440}
              id="recipe-cooking-time"
              placeholder="Eg: 40"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="recipe-image">Recipe Image (URL)</label>
            <input
              onChange={handleInputChange}
              className="w-full border-[1px] border-blue-900 p-2 rounded-md"
              type="text"
              value={recipe.image}
              name="image"
              id="recipe-image"
              placeholder="Eg: https://images.com/food.jpg"
            />
          </div>

          <button
            className="text-xl font-semibold text-white transition-all duration-150 hover:brightness-125 from-submit-gradient-start to-submit-gradient-end bg-gradient-to-r rounded-md shadow-lg px-5 py-2"
            type="submit"
          >
            Create Recipe
          </button>
        </form>
      </main>
    </div>
  );
}
