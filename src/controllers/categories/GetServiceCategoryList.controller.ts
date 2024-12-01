import { ListInterface, ListParams, ServiceCategoryResponse } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { CategoryEntity, Repository } from '../../domain';
import { Types } from 'mongoose';

export async function GetServiceCategoryListController(req: express.Request, res: express.Response) {
  let response: ListInterface<ServiceCategoryResponse> = {
    meta: {
      count: 0,
      currentPage: 1,
      pages: 0,
    },
    items: [],
  };
  const baseLang = req.headers['accept-language'];
  let params: ListParams;

  try {
    params = await new ListParams(req.query).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const serviceCategoryList = await Repository.ServicesCategory().list({ page: params.page, size: params.size }, { status: true });

    response.meta.count = await Repository.ServicesCategory().countDocumentsByFilter({ status: true });
    response.meta.pages = Math.ceil(response.meta.count / params.size);
    response.items = serviceCategoryList.map(serviceCategory => {
      return {
        id: serviceCategory.getId(),
        service: serviceCategory.getService(),
        categoryId: (serviceCategory.getCategoryId() as CategoryEntity).getId(),
        serviceCategoryId: serviceCategory.getServiceCategoryId(),
        status: serviceCategory.getStatus(),
        createdAt: serviceCategory.getCreatedAt(),
        updatedAt: serviceCategory.getUpdatedAt(),
      };
    });
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
