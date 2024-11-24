import * as express from 'express';
import { Password, sendError, sendSuccess, sendValidationError, UtilityService } from '../../services';
import { CreateOperatorParams, GetOperatorResponse, OperatorEmailExistsError, OperatorStatusEnum } from '../../definitions';
import { Types } from 'mongoose';
import * as sha1 from 'sha1';
import { OperatorEntity, Repository } from '../../domain';

export async function CreateOperatorController(req: express.Request, res: express.Response) {
  let response: GetOperatorResponse;
  let params: CreateOperatorParams;

  try {
    params = await new CreateOperatorParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const checkEmail = await Repository.Operator().getByEmail(params.email);
    if (checkEmail) throw new OperatorEmailExistsError();

    const createPassword = await UtilityService.generatorPassword(parseInt(process.env.GENERATED_PASSWORD_LENGTH));
    const userPassword = new Password().buildPassword(sha1(createPassword));
    const password = await userPassword.hash();

    const newOperator = new OperatorEntity()
      .buildFullName(params.fullName)
      .buildEmail(params.email)
      .buildPassword(password)
      .buildStatus(OperatorStatusEnum.NEED_CHANGE_PASSWORD);

    const created = await Repository.Operator().create(newOperator);

    response = new GetOperatorResponse(created);
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
