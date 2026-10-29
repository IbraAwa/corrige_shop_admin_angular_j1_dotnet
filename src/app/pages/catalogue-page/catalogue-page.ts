import { Component, computed, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../models/product';
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
    this.products.update((products) => products.map(product =>
    product.id === event.product.id ? {...product, stock: product.stock - event.quantity}: product))
    }
}
