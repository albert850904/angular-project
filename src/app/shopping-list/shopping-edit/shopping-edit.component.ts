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
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
  @ViewChild('f', { static: true }) shoppingForm: NgForm;
  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}
  editScription: Subscription;
  editMode = false;
  // editItemInd: number; redux 已經知道你在處理哪個component了
  editItem: Ingredient;

  ngOnInit(): void {
    // this.editScription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editItemInd = index;
    //     this.editItem = this.shoppingListService.getIngredient(index);
    //     this.shoppingForm.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amount,
    //     });
    //   }
    // );
    this.editScription = this.store
      .select('shoppingList')
      .subscribe((state) => {
        if (state.editedIngredientInd > -1) {
          this.editMode = true;
          // this.editItemInd = state.editedIngredientInd;
          this.editItem = state.editedIngredient;
          this.shoppingForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmitRecipeHandler(form: NgForm) {
    // 記得用model
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editItemInd,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.clearForm();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editItemInd);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  clearForm() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.editScription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
