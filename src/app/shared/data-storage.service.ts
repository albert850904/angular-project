import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeSvc: RecipeService,
    private authSvc: AuthService
  ) {}

  recipeStorageHandler() {
    const tempRecipes = this.recipeSvc.getRecipes();
    this.http
      .put(
        'https://angular-89b56-default-rtdb.firebaseio.com/recipes.json',
        tempRecipes
      )
      .subscribe((res) => console.log(res));
  }

  getRecipesHandler() {
    return this.http
      .get<Recipe[]>(
        'https://angular-89b56-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((res) => {
          return res.map((data) => {
            return {
              ...data,
              ingredients: data.ingredients ? data.ingredients : [],
            };
          });
        }),
        tap((res) => {
          this.recipeSvc.setRecipes(res);
        })
      );
  }
}
