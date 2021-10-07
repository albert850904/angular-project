import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState = {
  recipes: [],
};

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES: {
      return { ...state, recipes: [...action.payload] };
    }
    case RecipeActions.ADD_RECIPE: {
      return { ...state, recipes: [...state.recipes, action.payload] };
    }
    case RecipeActions.UPDATE_RECIPE: {
      const target = state.recipes.find(
        (recipe) => recipe.id === action.payload.index
      );
      const updateRecipe = { ...target, ...action.payload.newRecipe };
      const updateRecipes = [...state.recipes];
      updateRecipes[updateRecipes.indexOf(target)] = updateRecipe;
      return { ...state, recipes: updateRecipes };
    }
    case RecipeActions.DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    }
    default:
      return state;
  }
}
