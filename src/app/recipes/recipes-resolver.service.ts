import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSvc: DataStorageService,
    private recipeSvc: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentRecipes = this.recipeSvc.getRecipes();
    if (currentRecipes.length > 0) return currentRecipes;
    // 這裡不subscribe 因為resolver 會自動訂閱
    return this.dataStorageSvc.getRecipesHandler();
  }
}
