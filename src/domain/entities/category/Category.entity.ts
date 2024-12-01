import { BaseEntityInterface } from '../../../definitions';
import { CategorySchema, TranslatesSchema } from '../../../database';
import { TranslatesEntity } from '../Translates.entity';
import { Types } from 'mongoose';

export class CategoryEntity implements BaseEntityInterface<CategoryEntity, CategorySchema> {
  protected _id?: Types.ObjectId;
  protected _name?: TranslatesEntity;
  protected _status?: boolean;
  protected _updatedAt?: Date;
  protected _createdAt?: Date;

  /** Builders */
  buildId(id: Types.ObjectId): CategoryEntity {
    this._id = id;
    return this;
  }

  buildName(name: TranslatesSchema): CategoryEntity {
    this._name = new TranslatesEntity().convertToEntity(name);
    return this;
  }

  buildStatus(status: boolean): CategoryEntity {
    this._status = status;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): CategoryEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  buildCreatedAt(createdAt: Date): CategoryEntity {
    this._createdAt = createdAt;
    return this;
  }

  /** Getters */
  getId(): Types.ObjectId {
    return this._id;
  }

  getName(): TranslatesEntity {
    return this._name;
  }

  getStatus(): boolean {
    return this._status;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  convertToEntity(category: CategorySchema): CategoryEntity {
    if (!category) return null;
    this.buildId(category._id)
      .buildName(category.name)
      .buildStatus(category.status)
      .buildUpdatedAt(category.updatedAt)
      .buildCreatedAt(category.createdAt);
    return this;
  }

  convertToSchema(): CategorySchema {
    return this
      ? {
          _id: this.getId(),
          name: this.getName()?.convertToSchema(),
          status: this.getStatus(),
        }
      : null;
  }
}
