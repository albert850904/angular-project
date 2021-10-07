import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap((fetchAction) => {
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
          map((recipes) => {
            return new RecipesActions.SetRecipes(recipes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  storeRecipe = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://angular-89b56-default-rtdb.firebaseio.com/recipes.json',
        recipesState.recipes
      );
    })
  );
}
