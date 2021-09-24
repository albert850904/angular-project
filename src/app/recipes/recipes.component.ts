import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor() {}

  ngOnInit() {
    // 這邊透過resolver 處理，不需再透過訂閱方式
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => (this.selectedRecipe = recipe)
    // );
  }
}
