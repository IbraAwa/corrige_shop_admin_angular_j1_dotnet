import { Component, signal } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Product } from '../../models/product';
import { StockLabelPipe } from '../../pipes/stock-label-pipe';

@Component({
  selector: 'app-catalogue-page',
  imports: [CurrencyPipe, TitleCasePipe, StockLabelPipe],
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.scss',
})
export class CataloguePage {
  product = signal<Product>({
    id: 1,
    name: 'clavier mécanique sans fil',
    price: 89.9,
    stock: 3,
    category: 'Périphériques',
    imageUrl: 'products/clavier.svg',
  });

  cartCount = signal(0);

  addToCart() {
    this.cartCount.update((c) => c + 1);
    this.product.update((p) => ({ ...p, stock: p.stock - 1 }));
  }
}
