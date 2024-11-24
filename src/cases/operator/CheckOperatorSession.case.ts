import { Types } from 'mongoose';
import {
  InvalidTokenError,
  ErrorCodeEnum,
  OperatorIsNotActiveError,
  OperatorNeedToChangePasswordError,
  TokenExpiredError,
  OperatorStatusEnum,
  BaseCaseInterface,
  OperatorSessionStatusEnum,
  NotFoundError,
  AuthorizationError,
} from '../../definitions';
import { OperatorEntity, OperatorSessionEntity, Repository } from '../../domain';
import { Token } from '../../services';

interface CheckOperatorSessionCaseParams {
  accessToken: string;
  status: OperatorStatusEnum;
}

interface CheckOperatorSessionCaseResponse {
  operator: OperatorEntity;
  session: OperatorSessionEntity;
}

export class CheckOperatorSessionCase implements BaseCaseInterface<CheckOperatorSessionCaseParams, CheckOperatorSessionCaseResponse> {
  async execute(params: CheckOperatorSessionCaseParams): Promise<CheckOperatorSessionCaseResponse> {
    try {
      const payload = new Token(process.env.JWT_SECRET, Number(process.env.JWT_EXPIRES)).buildToken(params.accessToken).verify();
      const session = await Repository.OperatorSession().getById(new Types.ObjectId(payload['session']));

      if (!session) {
        throw new NotFoundError('Session');
      }

      if (session.getAccessToken() !== params.accessToken) {
        throw new InvalidTokenError();
      }

      if (session.getStatus() !== OperatorSessionStatusEnum.ACTIVE) {
        throw new AuthorizationError('Operator session is not active');
      }

      const operator = await Repository.Operator().getById(payload['operator']);

      if (operator?.getStatus() !== params.status) {
        switch (params.status) {
          /* When we are checking temporary session, but operator status is not NEED TO CHANGE */
          case OperatorStatusEnum.NEED_CHANGE_PASSWORD:
            throw new OperatorNeedToChangePasswordError();
          /* When we are checking operator session, but operator status is not ACTIVE */
          case OperatorStatusEnum.ACTIVE:
            throw new OperatorIsNotActiveError();
        }
      }

      return { operator, session };
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw new TokenExpiredError();
      }
      if (error.message === 'invalid signature' || error.message === 'jwt malformed') {
        throw new InvalidTokenError();
      }

      error.code = ErrorCodeEnum.AUTHORIZATION_ERROR;
      throw error;
    }
  }
}

export const checkOperatorSessionCase: BaseCaseInterface<CheckOperatorSessionCaseParams, CheckOperatorSessionCaseResponse> =
  new CheckOperatorSessionCase();
