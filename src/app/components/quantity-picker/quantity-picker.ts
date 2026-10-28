import { Component, input, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quantity-picker',
  styleUrl: './quantity-picker.scss',
  templateUrl: './quantity-picker.html',
})
export class QuantityPicker {
  quantity = model.required<number>()

  // le parent nous envoie le stock pour ne pas dépasser la quantité disponible
  max = input.required<number>()

  decrement() : void {
    // on ne descend jamais en dessous de 1
    if (this.quantity() > 1) {
      this.quantity.update((quant) => quant - 1);
    }
  }

  increment() : void {
    // on ne monte jamais au-dessus du stock
    if (this.quantity() < this.max()) {
      this.quantity.update((quant) => quant + 1 )
    }
  }

}
