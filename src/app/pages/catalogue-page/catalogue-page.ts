import { Component, signal } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Product, PRODUCTS } from '../../models/product';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';
import { FormsModule } from '@angular/forms';
import { LowStock } from '../../Directives/low-stock';

@Component({
  selector: 'app-catalogue-page',
  imports: [CurrencyPipe, TitleCasePipe, StockLabelPipe, FormsModule, LowStock],
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.scss',
})
export class CataloguePage {

  products = signal<Product[]>([...PRODUCTS])
  categoryChoice = signal<string>("")
  cartCount = signal(0);

  addToCart(productParameter : Product) {
    this.cartCount.update((c) => c + 1);
   //console.log(product.name)
   this.products.update((products) => products.map(product =>
    product.id === productParameter.id ? {...product, stock: productParameter.stock - 1} : product
   ))
  }
}
