import { FilterQuery, Types } from 'mongoose';
import { BaseCRUDRepository } from '../base';
import { OperatorEntity } from '../../entities';
import { OperatorSchema, OperatorModel } from '../../../database';
import { OperatorRepositoryInterface, PaginationInterface } from '../../../definitions';

export class OperatorRepository extends BaseCRUDRepository<OperatorEntity, OperatorSchema> implements OperatorRepositoryInterface {
  async create(_operator: OperatorEntity): Promise<OperatorEntity> {
    const requiredFields: string[] = ['_fullName', '_email', '_password'];
    this.checkRequiredFields(requiredFields, _operator);
    const operatorToCreate: OperatorSchema = _operator.convertToSchema();
    const created = await OperatorModel.create(operatorToCreate);
    return new OperatorEntity().convertToEntity(created);
  }

  async update(_operator: OperatorEntity): Promise<OperatorEntity> {
    const requiredFields: string[] = ['_id'];
    this.checkRequiredFields(requiredFields, _operator);
    const operatorToUpdate: OperatorSchema = _operator.convertToSchema();
    const updated = await OperatorModel.findOneAndUpdate({ _id: _operator.getId() }, { $set: operatorToUpdate }, { new: true });
    return new OperatorEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<OperatorEntity> {
    const found = await OperatorModel.findOne({ _id });
    return new OperatorEntity().convertToEntity(found);
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<OperatorEntity>> {
    const operators = await OperatorModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter(operators, OperatorEntity);
  }

  async countDocumentsByFilter(filter: object): Promise<number> {
    return OperatorModel.countDocuments(filter);
  }

  async getByEmail(email: string): Promise<OperatorEntity> {
    const found = await OperatorModel.findOne({ email });
    return new OperatorEntity().convertToEntity(found);
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await OperatorModel.deleteOne({ _id: _id });
    return deleted.deletedCount === 1;
  }

  async deleteRolesFromMany(roleId: Types.ObjectId): Promise<boolean> {
    const updated = await OperatorModel.updateMany({ roles: roleId }, { $pull: { roles: roleId } });
    return updated.modifiedCount === 1;
  }
}
