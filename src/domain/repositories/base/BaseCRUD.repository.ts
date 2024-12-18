import { FilterQuery, Types } from 'mongoose';
import { RequirementError, PaginationInterface, BaseCRUDRepositoryInterface, BaseEntityInterface } from '../../../definitions';

export abstract class BaseCRUDRepository<T extends BaseEntityInterface<T, K>, K> implements BaseCRUDRepositoryInterface<T> {
  abstract create(arg: T): Promise<T>;
  abstract update(arg: T): Promise<T>;
  abstract getById(id: Types.ObjectId): Promise<T>;
  abstract list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<T>>;

  protected checkRequiredFields(fields: string[], obj: T): void {
    for (const field of fields) {
      if (obj[field] === null || obj[field] === undefined) throw new RequirementError(field);
    }
  }

  protected multipleConverter(_modelClassItems: K[], TCreator: { new (): T }): Array<T> {
    const entities: T[] = [];
    for (const item of _modelClassItems) {
      const entityObject = new TCreator().convertToEntity(item);
      entities.push(entityObject);
    }
    return entities;
  }
}
