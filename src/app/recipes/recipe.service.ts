import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Test',
      'This is a Test',
      'https://www.carstuff.com.tw/media/k2/items/cache/355a1b4eb7547da1a62a3619c54170ea_XL.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Mango', 5)]
    ),
    new Recipe(
      'Test 2',
      'This is second Test',
      'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/urus/2021/03_16/urus_s2_m.jpg',
      [new Ingredient('Bread', 2), new Ingredient('Vanilla', 3)]
    ),
  ]; // array holds couple of Recipe object

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // reutrn new array
  }

  addRecipeToShoppingList(ingredients: Ingredient[]) {
    // for (const item of ingredients) {
    //   this.shoppingListService.addIngredient(item);
    // } 這樣會造成很多不必要的event emit
    this.shoppingListService.addMultipleIngredients(ingredients);
  }
}
