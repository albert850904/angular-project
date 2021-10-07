import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSvc: DataStorageService,
    private recipeSvc: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentRecipes = this.recipeSvc.getRecipes();
    // if (currentRecipes.length > 0) return currentRecipes;
    return this.store.select('recipe').pipe(
      take(1),
      map((recipeState) => {
        console.log(recipeState);
        return recipeState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          // 這裡不subscribe 因為resolver 會自動訂閱
          // return this.dataStorageSvc.getRecipesHandler();
          // dispatch 不會get observable back
          this.store.dispatch(new RecipeActions.FetchRecipes());
          // 透過監聽這個action occur，等recipes被設定進去redux，就可以回傳observable
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          // 有recipes 就不要再送request了
          return of(recipes);
        }
      })
    );
  }
}
