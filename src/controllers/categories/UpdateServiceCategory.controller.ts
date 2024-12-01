import { ServiceCategoryResponse, ServiceCategoryParams, IdParams, ServiceEnum, NotFoundError } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { CategoryEntity, Repository, ServicesCategoryEntity } from '../../domain';
import { Types } from 'mongoose';

export async function UpdateServiceCategoryController(req: express.Request, res: express.Response) {
  let response: ServiceCategoryResponse;
  let params: ServiceCategoryParams;
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
    params = await new ServiceCategoryParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const serviceCategory = await Repository.ServicesCategory().getById(new Types.ObjectId(idParam.id));
    if (!serviceCategory) throw new NotFoundError('Service Category');

    serviceCategory
      .buildServiceCategoryId(params.serviceCategoryId)
      .buildCategoryId(new Types.ObjectId(params.categoryId))
      .buildService(params.service as ServiceEnum)
      .buildStatus(params.status);

    const updatedServiceCategory = await Repository.ServicesCategory().update(serviceCategory);

    response = {
      id: updatedServiceCategory.getId(),
      serviceCategoryId: updatedServiceCategory.getServiceCategoryId(),
      categoryId: (serviceCategory.getCategoryId() as CategoryEntity).getId(),
      service: updatedServiceCategory.getService(),
      status: updatedServiceCategory.getStatus(),
      createdAt: updatedServiceCategory.getCreatedAt(),
      updatedAt: updatedServiceCategory.getUpdatedAt(),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
