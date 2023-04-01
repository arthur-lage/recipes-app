export function createRecipeReducer(state: any, action: any) {
  switch (action.type) {
    case "handle_input":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "add_ingredient":
      let ingredientsArray = state.ingredients;

      ingredientsArray.push("");

      return {
        ingredients: ingredientsArray,
        ...state,
      };
    case "handle_ingredient_input":
      let newIngredients = state.ingredients;
      newIngredients[action.ingredientIndex] = action.payload;

      return {
        ...state,
        ingredients: newIngredients,
      };
    default:
      return state;
  }
}
