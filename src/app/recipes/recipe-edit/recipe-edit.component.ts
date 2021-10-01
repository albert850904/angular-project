import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  paramsSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getSingleRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(id);
    // (<FormArray>this.recipeForm.get('ingredient')).clear();
  }

  onSubmit() {
    const recipeData = new Recipe(
      this.recipeId || this.recipeService.recipes.length + 1,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, recipeData);
    } else {
      this.recipeService.addRecipe(recipeData);
    }
    this.onCancel();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
