import * as express from 'express';
import { sendSuccess, sendError, sendValidationError } from '../../services';
import { Types } from 'mongoose';
import { GetOperatorResponse, IdParams, NotFoundError } from '../../definitions/';
import { Repository } from '../../domain';

export async function GetOperatorByIdController(req: express.Request, res: express.Response) {
  let response: GetOperatorResponse;
  let idParams: IdParams;
  try {
    idParams = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }
  try {
    const operator = await Repository.Operator().getById(new Types.ObjectId(idParams.id));
    if (!operator) {
      throw new NotFoundError('Operator');
    }

    response = new GetOperatorResponse(operator);

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
