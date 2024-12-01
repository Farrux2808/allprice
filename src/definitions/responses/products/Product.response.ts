import { ServiceEnum } from '../../enums';

export interface ProductResponse {
  name: string;
  description?: string;
  price: number;
  category?: string;
  mainImage?: string;
  images?: Array<string>;
  service: ServiceEnum;
  link?: string;
}
