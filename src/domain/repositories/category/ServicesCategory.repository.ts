import { BaseCRUDRepository } from '../base';
import { ServicesCategoryEntity } from '../../entities';
import { ServicesCategoryModel, ServicesCategorySchema } from '../../../database';
import { ServicesCategoryRepositoryInterface, PaginationInterface, ServiceEnum } from '../../../definitions';
import { FilterQuery, Types } from 'mongoose';

export class ServicesCategoryRepository
  extends BaseCRUDRepository<ServicesCategoryEntity, ServicesCategorySchema>
  implements ServicesCategoryRepositoryInterface
{
  async create(_servicesCategory: ServicesCategoryEntity): Promise<ServicesCategoryEntity> {
    const requiredFields: string[] = [];
    this.checkRequiredFields(requiredFields, _servicesCategory);
    const servicesCategoryToCreate: ServicesCategorySchema = _servicesCategory.convertToSchema();
    const created = await ServicesCategoryModel.create(servicesCategoryToCreate);
    return new ServicesCategoryEntity().convertToEntity(created);
  }

  async update(_servicesCategory: ServicesCategoryEntity): Promise<ServicesCategoryEntity> {
    const requiredFields: string[] = ['_id'];
    this.checkRequiredFields(requiredFields, _servicesCategory);
    const servicesCategoryToUpdate: ServicesCategorySchema = _servicesCategory.convertToSchema();
    const updated = await ServicesCategoryModel.findOneAndUpdate(
      { _id: _servicesCategory.getId() },
      { $set: servicesCategoryToUpdate },
      { new: true },
    );
    return new ServicesCategoryEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<ServicesCategoryEntity> {
    const found = await ServicesCategoryModel.findOne({ _id });
    return new ServicesCategoryEntity().convertToEntity(found);
  }

  async delete(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await ServicesCategoryModel.findOneAndDelete({ _id });
    return !!deleted;
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<ServicesCategoryEntity>> {
    const categories = await ServicesCategoryModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter(categories, ServicesCategoryEntity);
  }

  async countDocumentsByFilter(filter: object): Promise<number> {
    return ServicesCategoryModel.countDocuments(filter);
  }

  async getByCategoryAndService(categoryId: Types.ObjectId, service: ServiceEnum): Promise<ServicesCategoryEntity> {
    const found = await ServicesCategoryModel.findOne({ categoryId, service });
    return new ServicesCategoryEntity().convertToEntity(found);
  }
}
