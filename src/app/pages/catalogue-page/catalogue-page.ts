import { Component, computed, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { cartItemModel } from '../../components/cart-items/cart-item.model';
import { CartItems } from '../../components/cart-items/cart-items';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-catalogue-page',
  imports: [ProductCard, CartItems, CurrencyPipe],
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.scss',
})

export class CataloguePage {

  products = signal<Product[]>([...PRODUCTS])
  categoryChoice = signal<string>("")
  cartCount = signal(0);

  cart = signal<cartItemModel[]>([])
  // reduce() parcourir un tableau et accumulé le résultat grâce au total :
  // TABLEAU :
  // ITEM 1 : produit : (Souris, 10€), quantity : 5
  // ITEM 2 : produit : (Clavier, 15€), quantity : 2
  // valeur de départ donner dans le deuxieme argument est 0
  // IL PARCOURT LE TABLEAU IL EST ACUTELLEMENT DANS ITEM 1
  // total(0) + (10€ * 5) = 50
  // total(0) + resultatCalcul(50) = 50
  // IL continue a parcourir le tableau il est acutellement dans ITEM 2
  // total(50) + (15 * 2) = 30
  // total(50) + resultatCalcul(30) = 80
  // il va accumuler les résultats obtenu (50 et 30) ce qui va renvoyer un totalHTVA de 80
  totalHTVA = computed(() => this.cart().reduce((total, item) => total + (item.product.price * item.quantity), 0))

  TVA = computed(() => this.totalHTVA() * 0.21)

  TotalTTC = computed(() => this.totalHTVA() + this.TVA())


  addToCart(event : {product: Product; quantity: number}) {
    this.cartCount.update((c) => c + event.quantity);
    this.products.update((products) => products.map(product =>
    product.id === event.product.id ? {...product, stock: product.stock - event.quantity}: product))

    // EVENT RECU => produit : souris(2, souris gamer, 15€), quantite 1
    // ITEM 1 : Produit : clavier(1, clavier, 150€), quantité : 15
    // ITEM 2 : Produit : souris(2, souris gamer, 15€), quantite : 2
    let productExist : cartItemModel[] = this.cart().filter(cartItem => event.product.id === cartItem.product.id)

    if(productExist.length > 1) {
      console.error("Il y'a un doublon dans votre panier")
    }

    if(productExist.length === 1) {
      // on va dans notre signal cart ou se trouve tout nos carItem
      // on veut update uniquement un cartItem pécis (le même que celui qu'on a reçu de l'event)
      // (list) qui nous donne notre tableau de cartItem qui est dans le signal
      // on fait un map dessus qui nous retourne un nouveau tableau
      // le map regarde si l'item qu'il regarde actuellement dans le tableau est égale a l'item reçu en event
      // SI OUI on prend toute les valeur de notre item qu'il regarde actuellement et on modifie sa quantité
      // SI NON on rajoute juste cartItem qu'il regarde actuellement dans le nouveau tableau
      // spread ...cartItem => Reprend tout les propriété avec leur valeur de ma cartItem
      this.cart.update((list) => list.map((cartItem) => event.product.id === cartItem.product.id
      ? {...cartItem, quantity: cartItem.quantity + event.quantity}
      : cartItem
    ))

    return; // pour arrêter immédiatement la fonction
    }


    // list => reprend tout mes ancien élément dans la list
    // spread ...list => ça veut dire que je rajoute dans mon nouveau tableau tout les ancien élément
    this.cart.update((list) => [...list, event ])
  }

  // LINKEDSIGNAL QUI PERMET de choisir notre categorie this.categoryChoice();
  // deux bouton pour les deux catégorie quand on clique sur un bouton le linked signal doit faire qlq chose
  // if dans le for


}
