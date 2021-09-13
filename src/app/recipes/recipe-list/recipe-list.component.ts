import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test',
      'This is a Test',
      'https://www.carstuff.com.tw/media/k2/items/cache/355a1b4eb7547da1a62a3619c54170ea_XL.jpg'
    ),
    new Recipe(
      'Test 2',
      'This is second Test',
      'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/urus/2021/03_16/urus_s2_m.jpg'
    ),
  ]; // array holds couple of Recipe object
  @Output() featuredRecipe = new EventEmitter<Recipe>();
  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.featuredRecipe.emit(recipe);
  }
}
