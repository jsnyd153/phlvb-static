export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  level: Level;
  image: string;
  rating: Rating;
}

const enum Levels {
  Electronics = 'electronics',
  Jewelery = 'jewelery',
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

interface Rating {
  rate: number;
  count: number;
}
