import * as moment from 'moment';
import { Types } from 'mongoose';
import {
  BaseCaseInterface,
  LoginOrPasswordInCorrectError,
  NotFoundError,
  OperatorIsNotActiveError,
  OperatorSessionStatusEnum,
  OperatorStatusEnum,
} from '../../definitions';
import { OperatorSessionMetadataSchema } from '../../database';
import { OperatorEntity, OperatorSessionEntity, Repository } from '../../domain';
import { Password, Token } from '../../services';

interface CreateOperatorSessionByEmailCaseParams {
  email: string;
  password: string;
  useragent: string;
  metadata?: OperatorSessionMetadataSchema;
}

interface CreateOperatorSessionByEmailCaseResponse {
  operator: OperatorEntity;

  session: OperatorSessionEntity;
}

export class CreateOperatorSessionByEmailCase
  implements BaseCaseInterface<CreateOperatorSessionByEmailCaseParams, CreateOperatorSessionByEmailCaseResponse>
{
  async execute(params: CreateOperatorSessionByEmailCaseParams): Promise<CreateOperatorSessionByEmailCaseResponse> {
    const operator = await Repository.Operator().getByEmail(params.email);

    if (!operator) throw new NotFoundError('Operator');
    const comparePassword = await new Password().buildPassword(params.password).buildHash(operator.getPassword()).compare();
    if (!comparePassword) {
      throw new LoginOrPasswordInCorrectError();
    }
    let session: OperatorSessionEntity;

    if (![OperatorStatusEnum.ACTIVE, OperatorStatusEnum.NEED_CHANGE_PASSWORD].includes(operator.getStatus())) {
      throw new OperatorIsNotActiveError();
    }

    const sessionId = new Types.ObjectId();
    const accessToken = new Token(process.env.JWT_SECRET, Number(process.env.JWT_EXPIRES), {
      operator: operator.getId(),
      session: sessionId,
    }).sign();

    session = new OperatorSessionEntity()
      .buildId(sessionId)
      .buildOperator(operator.getId())
      .buildUseragent(params.useragent)
      .buildExpireSeconds(Number(process.env.JWT_EXPIRES))
      .buildMetadata(params.metadata)
      .buildStatus(OperatorSessionStatusEnum.ACTIVE)
      .buildExpiresAt(moment().add(Number(process.env.JWT_EXPIRES), 's').toDate())
      .buildAccessToken(accessToken);

    await Repository.OperatorSession().create(session);

    return { session, operator };
  }
}

export const createOperatorSessionByEmailCase: BaseCaseInterface<CreateOperatorSessionByEmailCaseParams, CreateOperatorSessionByEmailCaseResponse> =
  new CreateOperatorSessionByEmailCase();
