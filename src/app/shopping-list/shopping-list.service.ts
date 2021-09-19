import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 10),
  ];

  // 不要讓使用者直接access到原本的物件
  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // 通知component list已經改變(因為我們getIngredients是回傳array的copy)
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addMultipleIngredients(ingredients) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
