export interface ICategory {
  id: number;
  name: string;
}

export interface ICategories {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

export interface IProduct {
  id: number;
  name: string;
  category_id: number;
  description: string;
  price: number;
  image: string;
  wt: number;
  unit: {
    id: number;
    name: string;
  };
  popular: boolean;
  delivery: boolean;
  takeaway: boolean;
  dinein: boolean;
  kilocalories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export interface IProducts {
  products: IProduct[];
  product: IProduct;
  loading: boolean;
  error: string | null;
}

export interface ICartItems {
  id: number;
  name: string;
  image: string;
  quantity: number;
  unit_price: number;
}

export interface ICart {
  cart_items: ICartItems[];
  total_price: number;
  render: boolean;
  loading: boolean;
  error: string | null;
}
