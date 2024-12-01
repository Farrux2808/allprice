import { BaseCRUDRepository } from '../base';
import { CategoryEntity } from '../../entities';
import { CategoryModel, CategorySchema } from '../../../database';
import { CategoryRepositoryInterface, PaginationInterface } from '../../../definitions';
import { FilterQuery, Types } from 'mongoose';

export class CategoryRepository extends BaseCRUDRepository<CategoryEntity, CategorySchema> implements CategoryRepositoryInterface {
  async create(_Category: CategoryEntity): Promise<CategoryEntity> {
    const requiredFields: string[] = [];
    this.checkRequiredFields(requiredFields, _Category);
    const categoryToCreate: CategorySchema = _Category.convertToSchema();
    const created = await CategoryModel.create(categoryToCreate);
    return new CategoryEntity().convertToEntity(created);
  }

  async update(_Category: CategoryEntity): Promise<CategoryEntity> {
    const requiredFields: string[] = ['_id'];
    this.checkRequiredFields(requiredFields, _Category);
    const categoryToUpdate: CategorySchema = _Category.convertToSchema();
    const updated = await CategoryModel.findOneAndUpdate({ _id: _Category.getId() }, { $set: categoryToUpdate }, { new: true });
    return new CategoryEntity().convertToEntity(updated);
  }

  async delete(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await CategoryModel.findOneAndDelete({ _id });
    return !!deleted;
  }

  async getById(_id: Types.ObjectId): Promise<CategoryEntity> {
    const found = await CategoryModel.findOne({ _id });
    return new CategoryEntity().convertToEntity(found);
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<CategoryEntity>> {
    const categories = await CategoryModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter(categories, CategoryEntity);
  }

  async countDocumentsByFilter(filter: object): Promise<number> {
    return CategoryModel.countDocuments(filter);
  }
}
