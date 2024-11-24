import { OperatorSessionStatusEnum, OperatorStatusEnum } from '../../enums';
import { OperatorEntity, OperatorSessionEntity } from '../../../domain';

interface PermissionInterFace {
  target: string;
  action: string;
}

export class OperatorLoginResponse {
  fullName: string;

  email: string;

  operatorStatus?: OperatorStatusEnum;

  accessToken?: string;

  sessionStatus?: OperatorSessionStatusEnum;

  expiresAt: Date;

  constructor(session: OperatorSessionEntity, operator: OperatorEntity) {
    if (session && operator) {
      this.fullName = operator.getFullName();
      this.email = operator.getEmail();
      this.operatorStatus = operator.getStatus();
      this.accessToken = session.getAccessToken();
      this.sessionStatus = session.getStatus();
      this.expiresAt = session.getExpiresAt();
    }
  }
}
