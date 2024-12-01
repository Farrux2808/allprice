import { ServiceCategoryResponse, ServiceCategoryParams, IdParams, ServiceEnum } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { Repository, ServicesCategoryEntity } from '../../domain';
import { Types } from 'mongoose';

export async function CreateServiceCategoryController(req: express.Request, res: express.Response) {
  let response: ServiceCategoryResponse;
  let params: ServiceCategoryParams;
  const baseLang = req.headers['accept-language'];

  try {
    params = await new ServiceCategoryParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    let serviceCategory = new ServicesCategoryEntity()
      .buildServiceCategoryId(params.serviceCategoryId)
      .buildCategoryId(new Types.ObjectId(params.categoryId))
      .buildService(params.service as ServiceEnum)
      .buildStatus(params.status);
    serviceCategory = await Repository.ServicesCategory().create(serviceCategory);

    response = {
      id: serviceCategory.getId(),
      serviceCategoryId: serviceCategory.getServiceCategoryId(),
      categoryId: serviceCategory.getCategoryId() as Types.ObjectId,
      service: serviceCategory.getService(),
      status: serviceCategory.getStatus(),
      createdAt: serviceCategory.getCreatedAt(),
      updatedAt: serviceCategory.getUpdatedAt(),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
