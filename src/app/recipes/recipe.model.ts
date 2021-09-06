export class Recipe {
  public name: string; // public = 可以在外部使用
  public description: string;
  public imagePath: string;

  // passing the argument to constructor
  constructor(name: string, description: string, imagePath: string) {
    // 在create時執行
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}