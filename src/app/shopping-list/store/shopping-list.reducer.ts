import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientInd: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Bananas', 10)],
  editedIngredient: null,
  editedIngredientInd: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ShoppingListActions.ADD_MULTIPLE_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientInd];
      // 全部都要用copied之後的東西
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientInd] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientInd: -1,
        editedIngredient: null,
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((ing, index) => {
            return index !== state.editedIngredientInd;
          }),
        ],
        editedIngredientInd: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.START_EDIT:
      // immutable
      const targetIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredientInd: action.payload,
        editedIngredient: targetIngredient,
      };
    case ShoppingListActions.STOP_EDIT:
      return { ...state, editedIngredientInd: -1, editedIngredient: null };
    default:
      return state;
  }
}
