import { CategoryResponse, IdParams } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import * as express from 'express';
import { Repository } from '../../domain';
import { Types } from 'mongoose';

export async function DeleteCategoryByIdController(req: express.Request, res: express.Response) {
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const deleted = await Repository.Category().delete(new Types.ObjectId(idParam.id));
    sendSuccess({ deleted }, res);
  } catch (error) {
    sendError(error, res);
  }
}
