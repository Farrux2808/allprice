import { CategoryResponse, IdParams } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { Repository } from '../../domain';
import { Types } from 'mongoose';

export async function GetCategoryByIdController(req: express.Request, res: express.Response) {
  let response: CategoryResponse;
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const category = await Repository.Category().getById(new Types.ObjectId(idParam.id));
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
