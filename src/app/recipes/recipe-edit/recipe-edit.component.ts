import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  editMode: boolean = false;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = params['id'] !== null;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
