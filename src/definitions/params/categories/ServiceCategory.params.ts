import * as Joi from 'joi';
import { ServiceEnum } from '../../enums';

export class ServiceCategoryParams {
  categoryId: string;
  status: boolean;
  service: string;
  serviceCategoryId: string;

  constructor(params: any) {
    if (params) {
      this.categoryId = params.categoryId;
      this.status = params.status;
      this.service = params.service;
      this.serviceCategoryId = params.serviceCategoryId;
    }
  }

  async validate() {
    return await ServiceCategoryParamsSchema.validateAsync(this);
  }
}

export const ServiceCategoryParamsSchema = Joi.object<ServiceCategoryParams>({
  categoryId: Joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  status: Joi.boolean().required(),
  service: Joi.string()
    .valid(...Object.values(ServiceEnum))
    .trim()
    .required(),
  serviceCategoryId: Joi.string().trim().required(),
});
