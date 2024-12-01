import { ServiceCategoryResponse, IdParams } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { CategoryEntity, Repository } from '../../domain';
import { Types } from 'mongoose';

export async function GetServiceCategoryByIdController(req: express.Request, res: express.Response) {
  let response: ServiceCategoryResponse;
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const serviceCategory = await Repository.ServicesCategory().getById(new Types.ObjectId(idParam.id));
    response = {
      id: serviceCategory.getId(),
      service: serviceCategory.getService(),
      categoryId: (serviceCategory.getCategoryId() as CategoryEntity).getId(),
      serviceCategoryId: serviceCategory.getServiceCategoryId(),
      status: serviceCategory.getStatus(),
      createdAt: serviceCategory.getCreatedAt(),
      updatedAt: serviceCategory.getUpdatedAt(),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
