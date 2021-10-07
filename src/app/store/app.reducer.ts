import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromRecipeReducer from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingListReducer.ShoppingListState;
  auth: fromAuthReducer.AuthState;
  recipe: fromRecipeReducer.RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducer.shoppingListReducer,
  auth: fromAuthReducer.authReducer,
  recipe: fromRecipeReducer.recipeReducer,
};
