import { BaseEntityInterface, ServiceEnum } from '../../../definitions';
import { CategorySchema, ServicesCategorySchema } from '../../../database';
import { Types } from 'mongoose';
import { CategoryEntity } from './Category.entity';

export class ServicesCategoryEntity implements BaseEntityInterface<ServicesCategoryEntity, ServicesCategorySchema> {
  protected _id?: Types.ObjectId;
  protected _category?: Types.ObjectId | CategoryEntity;
  protected _service: ServiceEnum;
  protected _status?: boolean;
  protected _serviceCategoryId?: string;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  /** Builders */
  buildId(id: Types.ObjectId): ServicesCategoryEntity {
    this._id = id;
    return this;
  }

  buildCategoryId(category: Types.ObjectId | CategorySchema): ServicesCategoryEntity {
    if (category instanceof CategoryEntity) {
      this._category = category;
    } else {
      this._category = new CategoryEntity().convertToEntity(category);
    }
    return this;
  }

  buildService(service: ServiceEnum): ServicesCategoryEntity {
    this._service = service;
    return this;
  }

  buildStatus(status: boolean): ServicesCategoryEntity {
    this._status = status;
    return this;
  }

  buildServiceCategoryId(serviceCategoryId: string): ServicesCategoryEntity {
    this._serviceCategoryId = serviceCategoryId;
    return this;
  }

  buildCreatedAt(createdAt: Date): ServicesCategoryEntity {
    this._createdAt = createdAt;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): ServicesCategoryEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  /** Getters */
  getId(): Types.ObjectId {
    return this._id;
  }

  getCategoryId(): Types.ObjectId | CategoryEntity {
    return this._category;
  }

  getService(): ServiceEnum {
    return this._service;
  }

  getStatus(): boolean {
    return this._status;
  }

  getServiceCategoryId(): string {
    return this._serviceCategoryId;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  convertToEntity(serviceCategory: ServicesCategorySchema): ServicesCategoryEntity {
    if (!serviceCategory) return null;
    this.buildId(serviceCategory._id)
      .buildCategoryId(serviceCategory.categoryId)
      .buildService(serviceCategory.service)
      .buildStatus(serviceCategory.status)
      .buildServiceCategoryId(serviceCategory.serviceCategoryId)
      .buildCreatedAt(serviceCategory.createdAt)
      .buildUpdatedAt(serviceCategory.updatedAt);
    return this;
  }

  convertToSchema(): ServicesCategorySchema {
    return this
      ? {
          _id: this.getId(),
          categoryId: this.getCategoryId() as Types.ObjectId,
          service: this.getService(),
          status: this.getStatus(),
          serviceCategoryId: this.getServiceCategoryId(),
          createdAt: this.getCreatedAt(),
          updatedAt: this.getUpdatedAt(),
        }
      : null;
  }
}
