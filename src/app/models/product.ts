export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 1, name: 'Clavier mécanique', price: 89.99, stock: 2, category: 'Informatique',
    imageUrl: 'https://images.unsplash.com/photo-1756387462457-9afa97d2dbe8?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
  {
    id: 2, name: 'Souris sans fil', price: 29.99, stock: 30, category: 'Informatique',
    imageUrl: 'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
  {
    id: 3, name: 'Casque audio', price: 59.90, stock: 0, category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1590845947676-fa2576f401b2?w=600&h=600&fit=crop&fm=jpg&q=80',
  },
];
