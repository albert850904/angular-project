import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('itemProps') item: {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    ingredients: [];
  };

  constructor() {}

  ngOnInit(): void {}
}
