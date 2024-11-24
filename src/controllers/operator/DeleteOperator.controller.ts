import * as express from 'express';
import { IdParams, NotFoundError, OperatorIsNotDeletableError, OperatorStatusEnum } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { Types } from 'mongoose';
import { Repository } from '../../domain';

export async function DeleteOperatorController(req: express.Request, res: express.Response) {
  let params: IdParams;

  try {
    params = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    if (params.id === req.operator.getId().toString()) {
      throw new OperatorIsNotDeletableError();
    }

    const operator = await Repository.Operator().getById(new Types.ObjectId(params.id));
    if (!operator) throw new NotFoundError('Operator');

    const updated = await Repository.Operator().update(operator.buildStatus(OperatorStatusEnum.DELETED));

    sendSuccess({ deleted: updated.getStatus() === OperatorStatusEnum.DELETED }, res);
  } catch (error) {
    sendError(error, res);
  }
}
