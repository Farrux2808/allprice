import { BaseCaseParamsInterface, ProductResponse, ServiceEnum } from '../../definitions';
import { olchaAxiosInterceptor } from './utils';
import { Repository, TranslatesEntity } from '../../domain';
import { Types } from 'mongoose';

export interface GetProductByCategoryParams {
  categoryId: Types.ObjectId;
}

export class OlchaService {
  static async getProductsByCategory(params: BaseCaseParamsInterface<GetProductByCategoryParams>): Promise<Array<ProductResponse>> {
    try {
      const category = await Repository.ServicesCategory().getByCategoryAndService(params?.categoryId, ServiceEnum.OLCHA);
      if (!category || !category.getStatus()) return [];
      const url = process.env.OLCHA_ENDPOINT + `/products?category=${category.getServiceCategoryId()}`;

      const olchaProducts = await olchaAxiosInterceptor().get(url);

      if (olchaProducts.status === 200) {
        const products: Array<ProductResponse> = olchaProducts.data?.data?.products?.map((product: any) => {
          const name = new TranslatesEntity().buildEn(product.name_en).buildRu(product.name_ru).buildUz(product.name_oz);
          const description = new TranslatesEntity()
            .buildEn(product.short_description_en)
            .buildRu(product.short_description_ru)
            .buildUz(product.short_description_oz);
          const category = new TranslatesEntity()
            .buildEn(product.category.name_en)
            .buildRu(product.category.name_ru)
            .buildUz(product.category.name_oz);
          return {
            name: name.getByLang(params.baseLang),
            description: description.getByLang(params.baseLang),
            price: product.total_price,
            category: category.getByLang(params.baseLang),
            mainImage: product.main_image,
            images: product.images,
            service: ServiceEnum.OLCHA,
          };
        });
        return products;
      } else {
        console.log(olchaProducts);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
