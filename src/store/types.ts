export interface ICategory {
  id: number;
  name_rus: string;
  availability: boolean;
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
  price: number;
  availability: boolean;
  popular: boolean;
  delivery: boolean;
  takeaway: boolean;
  dinein: boolean;
}

export interface IProducts {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

export interface ICart {
  cart: IProduct[];
  loading: boolean;
  error: string | null;
}
