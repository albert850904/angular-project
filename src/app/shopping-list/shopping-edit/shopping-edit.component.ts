import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
  @ViewChild('f', { static: true }) shoppingForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}
  editScription: Subscription;
  editMode = false;
  editItemInd: number;
  editItem: Ingredient;

  ngOnInit(): void {
    this.editScription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemInd = index;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  onSubmitRecipeHandler(form: NgForm) {
    // 記得用model
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemInd,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.clearForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemInd);
    this.clearForm();
  }

  clearForm() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editScription.unsubscribe();
  }
}
