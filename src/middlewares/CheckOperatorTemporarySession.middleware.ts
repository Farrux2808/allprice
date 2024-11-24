import * as express from 'express';
import { OperatorStatusEnum, TokenNotProvidedError } from '../definitions';
import { checkOperatorSessionCase } from '../cases';
import { sendError } from '../services';

export async function CheckOperatorTemporarySessionMiddleware(req: express.Request, res: express.Responses, next: express.NextFunction) {
  try {
    if (!(req.headers && req.headers.authorization)) {
      throw new TokenNotProvidedError();
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    req.operator = await checkOperatorSessionCase.execute({ accessToken, status: OperatorStatusEnum.NEED_CHANGE_PASSWORD });
    return next();
  } catch (error) {
    sendError(error, res);
  }
}
