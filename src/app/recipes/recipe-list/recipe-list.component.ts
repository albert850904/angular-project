import { Component, OnInit } from '@angular/core';
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
  ]; // array holds couple of Recipe object

  constructor() {}

  ngOnInit(): void {}
}