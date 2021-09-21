import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: number;
  public name: string; // public = 可以在外部使用
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  // passing the argument to constructor
  constructor(
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    // 在create時執行
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
