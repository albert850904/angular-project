import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService], 需要往上，在這裡的話如果你去別頁再回來就會消失(Service被重置)
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
