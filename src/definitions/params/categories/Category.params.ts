import * as Joi from 'joi';
import { TranslatesParams, TranslatesParamsSchema } from '../translates';

export class CategoryParams {
  name: TranslatesParams;

  status: boolean;

  constructor(params: any) {
    if (params) {
      this.name = params.name;
      this.status = params.status;
    }
  }

  async validate() {
    return await CategoryParamsSchema.validateAsync(this);
  }
}

export const CategoryParamsSchema = Joi.object<CategoryParams>({
  name: TranslatesParamsSchema.required(),
  status: Joi.boolean().required(),
});
