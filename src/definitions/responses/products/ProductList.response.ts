import { ProductResponse } from './Product.response';
import { RequestStatusEnum } from '../../enums';

export interface ProductListResponse {
  products: Array<ProductResponse>;
  status?: RequestStatusEnum;
  nexStep?: number;
}
