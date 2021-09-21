import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { StartingRecipeComponent } from './recipes/starting-recipe/starting-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // '' 會match所有route,因為所有route都是由''為prefix
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: StartingRecipeComponent }, // default case (localhost:4200/recipe/)
      {
        path: 'new-recipe',
        component: RecipeEditComponent,
      }, // 需要在第一個，不然會被當作是 :id來判斷
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}