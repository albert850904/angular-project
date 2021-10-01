import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      1,
      'Test',
      'This is a Test',
      'https://www.carstuff.com.tw/media/k2/items/cache/355a1b4eb7547da1a62a3619c54170ea_XL.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Mango', 5)]
    ),
    new Recipe(
      2,
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

  getSingleRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipeToShoppingList(ingredients: Ingredient[]) {
    // for (const item of ingredients) {
    //   this.shoppingListService.addIngredient(item);
    // } 這樣會造成很多不必要的event emit
    this.shoppingListService.addMultipleIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(ind: number, recipe: Recipe) {
    const target = this.recipes.find((recipe) => recipe.id === ind);
    this.recipes[this.recipes.indexOf(target)] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(ind: number) {
    const removedRecipes = this.recipes.filter((recipe) => +recipe.id !== +ind);
    this.recipes = removedRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
