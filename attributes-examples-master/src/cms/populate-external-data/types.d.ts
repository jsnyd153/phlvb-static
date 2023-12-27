export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  start: string;
  rating: Rating;
  place: Place;
  aliasID:string;
  data:Data;

}

const enum Category {
  Electronics = 'electronics', 
  Jewelery = 'jewelery',
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

interface Rating {
  rate: number;
  count: number;
}

interface Place {
  title: string;
  zipCode: string;
}

interface Data {
  level: Level;
  genderID: number;
  sportName: string;
}

interface Level {
  title: string;
  value: number;

}

