export interface Category {
  category_id: number;
  category_name: string;
}

export interface Product extends Category {
  product_id: number;
  product_name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export type PublicUser = Pick<User, 'id' | 'name' | 'email' | 'created_at'>;
