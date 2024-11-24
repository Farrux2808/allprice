import { Types } from 'mongoose';
import { OperatorSessionMetadataEntity } from './OperatorSessionMetadata.entity';
import { OperatorSchema, OperatorSessionMetadataSchema, OperatorSessionSchema } from '../../../../database';
import { OperatorEntity } from '../Operator.entity';
import { OperatorSessionStatusEnum } from '../../../../definitions';

export class OperatorSessionEntity {
  protected _id?: Types.ObjectId;
  protected _operator?: Types.ObjectId | OperatorEntity;
  protected _accessToken?: string;
  protected _useragent?: string;
  protected _expireSeconds?: number;
  protected _metadata?: OperatorSessionMetadataEntity;
  protected _status?: OperatorSessionStatusEnum;
  protected _usedAt?: Date;
  protected _expiresAt?: Date;
  protected _updatedAt?: Date;
  protected _createdAt?: Date;

  /** Builders */
  buildId(id: Types.ObjectId): OperatorSessionEntity {
    this._id = id;
    return this;
  }

  buildOperator(operator: Types.ObjectId | OperatorSchema): OperatorSessionEntity {
    if (operator instanceof Types.ObjectId) {
      this._operator = operator;
    } else {
      this._operator = new OperatorEntity().convertToEntity(operator);
    }

    return this;
  }

  buildAccessToken(accessToken: string): OperatorSessionEntity {
    this._accessToken = accessToken;
    return this;
  }

  buildUseragent(useragent: string): OperatorSessionEntity {
    this._useragent = useragent;
    return this;
  }

  buildExpireSeconds(expireSeconds: number): OperatorSessionEntity {
    this._expireSeconds = expireSeconds;
    return this;
  }

  buildMetadata(metadata: OperatorSessionMetadataSchema): OperatorSessionEntity {
    this._metadata = new OperatorSessionMetadataEntity().convertToEntity(metadata);
    return this;
  }

  buildStatus(status: OperatorSessionStatusEnum): OperatorSessionEntity {
    this._status = status;
    return this;
  }

  buildUsedAt(usedAt: Date): OperatorSessionEntity {
    this._usedAt = usedAt;
    return this;
  }

  buildExpiresAt(expiresAt: Date): OperatorSessionEntity {
    this._expiresAt = expiresAt;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): OperatorSessionEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  buildCreatedAt(createdAt: Date): OperatorSessionEntity {
    this._createdAt = createdAt;
    return this;
  }

  /** Getters */
  getOperator(): Types.ObjectId | OperatorEntity {
    return this._operator;
  }

  getAccessToken(): string {
    return this._accessToken;
  }

  getUseragent(): string {
    return this._useragent;
  }

  getExpireSeconds(): number {
    return this._expireSeconds;
  }

  getMetadata(): OperatorSessionMetadataEntity {
    return this._metadata;
  }

  getStatus(): OperatorSessionStatusEnum {
    return this._status;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getUsedAt(): Date {
    return this._usedAt;
  }

  getExpiresAt(): Date {
    return this._expiresAt;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  /** Settings */
  convertToEntity(session: OperatorSessionSchema): OperatorSessionEntity {
    if (session == null) return null;
    this.buildId(session._id)
      .buildCreatedAt(session.createdAt)
      .buildUpdatedAt(session.updatedAt)
      .buildOperator(session.operator)
      .buildAccessToken(session.accessToken)
      .buildUseragent(session.useragent)
      .buildExpireSeconds(session.expireSeconds)
      .buildUsedAt(session.usedAt)
      .buildExpiresAt(session.expiresAt)
      .buildStatus(session.status)
      .buildMetadata(session.metadata);
    return this;
  }

  convertToSchema(): OperatorSessionSchema {
    return this
      ? {
          _id: this.getId(),
          accessToken: this.getAccessToken(),
          status: this.getStatus(),
          metadata: this.getMetadata()?.convertToSchema(),
          expireSeconds: this.getExpireSeconds(),
          expiresAt: this.getExpiresAt(),
          operator: this.getOperator() as Types.ObjectId,
          usedAt: this.getUsedAt(),
          useragent: this.getUseragent(),
          createdAt: this.getCreatedAt(),
          updatedAt: this.getUpdatedAt(),
        }
      : null;
  }
}
