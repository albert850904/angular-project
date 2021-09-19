import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('itemProps') item: {
    name: string;
    description: string;
    imagePath: string;
    ingredients: [];
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onSelected() {
    this.recipeService.recipeSelected.emit(this.item);
  }
}
