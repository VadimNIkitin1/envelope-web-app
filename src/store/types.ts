export interface ICategory {
  id: number;
  name_rus: string;
}

export interface ICategories {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

export interface IProduct {
  id: number;
  category_id: number;
  category_name: string;
  name_rus: string;
  description: string;
  webp_image_url: string;
  price: number;
  quantity: number;
}
export interface ICartItem {
  product: IProduct;
  quantity: number;
  total_price: number;
}

export interface IProducts {
  products: IProduct[];
  product: IProduct;
  loading: boolean;
  error: string | null;
}

export interface ICart {
  cart: IProduct[];
  total_price: number;
  quantity: number;
  loading: boolean;
  error: string | null;
}
