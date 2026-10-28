import { Component, signal } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Product, PRODUCTS } from '../../models/product';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';
import { FormsModule } from '@angular/forms';
import { LowStock } from '../../Directives/low-stock';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-catalogue-page',
  imports: [ProductCard],
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.scss',
})
export class CataloguePage {

  products = signal<Product[]>([...PRODUCTS])
  categoryChoice = signal<string>("")
  cartCount = signal(0);

  addToCart(event : {product: Product; quantity: number}) {
    this.cartCount.update((c) => c + event.quantity);
   //console.log(product.name)
   this.products.update((products) => products.map(product =>
    product.id === product.id ? {...product, stock: product.stock - event.quantity}: product
   ))
  }
}
