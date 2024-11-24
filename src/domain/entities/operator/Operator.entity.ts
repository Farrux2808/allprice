import { Types } from 'mongoose';
import { OperatorSchema } from '../../../database';
import { OperatorStatusEnum } from '../../../definitions';

export class OperatorEntity {
  protected _id?: Types.ObjectId;
  protected _fullName?: string;
  protected _email?: string;
  protected _password?: string;
  protected _status?: OperatorStatusEnum;
  protected _updatedAt?: Date;
  protected _createdAt?: Date;

  /** Builders */
  buildId(id: Types.ObjectId): OperatorEntity {
    this._id = id;
    return this;
  }

  buildFullName(fullName: string): OperatorEntity {
    this._fullName = fullName;
    return this;
  }

  buildEmail(email: string): OperatorEntity {
    this._email = email ? email.toLowerCase() : null;
    return this;
  }

  buildPassword(password: string): OperatorEntity {
    this._password = password;
    return this;
  }

  buildStatus(status: OperatorStatusEnum): OperatorEntity {
    this._status = status;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): OperatorEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  buildCreatedAt(createdAt: Date): OperatorEntity {
    this._createdAt = createdAt;
    return this;
  }

  /** Getters */
  getFullName(): string {
    return this._fullName;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  getStatus(): OperatorStatusEnum {
    return this._status;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  /** Settings */
  convertToEntity(operator: OperatorSchema): OperatorEntity {
    if (!operator) return null;
    this.buildId(operator._id)
      .buildCreatedAt(operator.createdAt)
      .buildUpdatedAt(operator.updatedAt)
      .buildFullName(operator.fullName)
      .buildEmail(operator.email)
      .buildPassword(operator.password)
      .buildStatus(operator.status);
    return this;
  }

  convertToSchema(): OperatorSchema {
    return this
      ? {
          _id: this.getId(),
          status: this.getStatus(),
          createdAt: this.getCreatedAt(),
          updatedAt: this.getUpdatedAt(),
          email: this.getEmail(),
          fullName: this.getFullName(),
          password: this.getPassword(),
        }
      : null;
  }
}
