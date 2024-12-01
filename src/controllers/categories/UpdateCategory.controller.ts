import { CategoryParams, CategoryResponse, IdParams, NotFoundError } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { CategoryEntity, Repository } from '../../domain';
import { Types } from 'mongoose';

export async function UpdateCategoryController(req: express.Request, res: express.Response) {
  let response: CategoryResponse;
  let params: CategoryParams;
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
    params = await new CategoryParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const category = await Repository.Category().getById(new Types.ObjectId(idParam.id));
    if (!category) throw new NotFoundError('Category');

    category.buildName(params.name).buildStatus(params.status);
    const updatedCategory = await Repository.Category().update(category);

    response = {
      id: updatedCategory.getId(),
      name: updatedCategory.getName().getByLang(baseLang),
      status: updatedCategory.getStatus(),
      createdAt: updatedCategory.getCreatedAt(),
      updatedAt: updatedCategory.getUpdatedAt(),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
