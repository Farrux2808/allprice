import { BaseCaseParamsInterface, ProductResponse, ServiceEnum } from '../../definitions';
import { texnomartAxiosInterceptor } from './utils';
import { Repository, TranslatesEntity } from '../../domain';
import { Types } from 'mongoose';
import { GetProductByCategoryParams } from '../olcha';

export class TexnomartService {
  static async getProductsByCategory(params: BaseCaseParamsInterface<GetProductByCategoryParams>): Promise<Array<ProductResponse>> {
    try {
      const category = await Repository.ServicesCategory().getByCategoryAndService(params?.categoryId, ServiceEnum.TEXNOMART);
      if (!category || !category.getStatus()) return [];
      const url = process.env.TEXNOMART_ENDPOINT + `/search/filters?category_all=${category.getServiceCategoryId()}&sort=price&page=1`;

      const texnomartProducts = await texnomartAxiosInterceptor().get(url);

      if (texnomartProducts.status === 200) {
        const products: Array<ProductResponse> = texnomartProducts.data?.data?.products?.map((product: any) => {
          let description: string = '';
          for (const character of product.main_characters) {
            description += `${character?.name}: ${character.value}\n`;
          }
          return {
            name: product.name,
            description: description,
            price: product.sale_price,
            mainImage: product.image,
            service: ServiceEnum.TEXNOMART,
          };
        });
        return products;
      } else {
        console.log(texnomartProducts);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
