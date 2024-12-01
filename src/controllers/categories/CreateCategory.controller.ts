import { CategoryParams, CategoryResponse, IdParams } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { CategoryEntity, Repository } from '../../domain';

export async function CreateCategoryController(req: express.Request, res: express.Response) {
  let response: CategoryResponse;
  let params: CategoryParams;
  const baseLang = req.headers['accept-language'];

  try {
    params = await new CategoryParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    let category = new CategoryEntity().buildName(params.name).buildStatus(params.status);
    category = await Repository.Category().create(category);

    response = {
      id: category.getId(),
      name: category.getName().getByLang(baseLang),
      status: category.getStatus(),
      createdAt: category.getCreatedAt(),
      updatedAt: category.getUpdatedAt(),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
