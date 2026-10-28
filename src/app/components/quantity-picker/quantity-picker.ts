import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quantity-picker',
  styleUrl: './quantity-picker.scss',
  templateUrl: './quantity-picker.html',
})
export class QuantityPicker {
  quantity = model.required<number>()

  decrement() : void {
    this.quantity.update((quant) => quant - 1);
  }

  increment() : void {
    this.quantity.update((quant) => quant + 1 )
  }

}
