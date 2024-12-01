import { Types } from 'mongoose';

export interface CategoryResponse {
  id: Types.ObjectId;
  name: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryListResponse {
  categories: Array<CategoryResponse>;
}
