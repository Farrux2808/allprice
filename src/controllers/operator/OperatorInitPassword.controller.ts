import * as express from 'express';
import { Password, sendError, sendSuccess, sendValidationError } from '../../services';
import { GetOperatorResponse, OperatorInitPasswordParams, OperatorOldPasswordIncorrectError, OperatorStatusEnum } from '../../definitions/';
import { OperatorEntity, Repository } from '../../domain';

export async function OperatorInitPasswordController(req: express.Request, res: express.Response) {
  let params: OperatorInitPasswordParams;
  let response: GetOperatorResponse;
  const operator: OperatorEntity = req.operator;

  try {
    params = await new OperatorInitPasswordParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const comparePassword = await new Password().buildPassword(params.oldPassword).buildHash(operator.getPassword()).compare();
    if (!comparePassword) {
      throw new OperatorOldPasswordIncorrectError();
    }

    const newPassword = await new Password().buildPassword(params.newPassword).hash();
    operator.buildStatus(OperatorStatusEnum.ACTIVE).buildPassword(newPassword);

    const updated = await Repository.Operator().update(operator);
    response = new GetOperatorResponse(updated);

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
