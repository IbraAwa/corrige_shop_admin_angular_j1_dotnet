import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';
import { FormsModule } from '@angular/forms';
import { LowStock } from '../../Directives/low-stock';
import { QuantityPicker } from '../quantity-picker/quantity-picker';

/* export interface productLine {
  product : Product,
  quantity : number
}
addToCart = output<productLine>()
*/

@Component({
  imports: [CurrencyPipe, TitleCasePipe, StockLabelPipe, FormsModule, LowStock, QuantityPicker],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCard {
  // grâce au input mon parent qui m'utilise pourra m'envoyé le produit qu'il veut afficher
  product = input.required<Product>()

  addToCart = output<{product: Product; quantity: number}>()

  quantity = signal<number>(1)

  onAddToCart(productParam : Product) {
   // on prend directement la valeur reçu par le parent
   // et quand on clique sur le bouton on l'envoit dans emit
   // this.addToCart.emit(this.product())

   // on prend en parametre un produit et c'est ce qu'on reçoit en parametre
   // qu'on envoie au parent
   this.addToCart.emit({ product: productParam, quantity: this.quantity()}) // {} => nouveau objet
   this.quantity.set(1)

  }

}
