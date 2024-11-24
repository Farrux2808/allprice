import { FilterQuery, Types } from 'mongoose';
import { BaseCRUDRepository } from '../base';
import { OperatorSessionEntity } from '../../entities';
import { OperatorSessionModel, OperatorSessionSchema } from '../../../database';
import { OperatorSessionRepositoryInterface, OperatorSessionStatusEnum, PaginationInterface } from '../../../definitions';
import * as moment from 'moment';

export class OperatorSessionRepository
  extends BaseCRUDRepository<OperatorSessionEntity, OperatorSessionSchema>
  implements OperatorSessionRepositoryInterface
{
  async create(_session: OperatorSessionEntity): Promise<OperatorSessionEntity> {
    const requiredFields: string[] = ['_operator'];
    this.checkRequiredFields(requiredFields, _session);
    const session: OperatorSessionSchema = _session.convertToSchema();
    const created = await OperatorSessionModel.create(session);
    return new OperatorSessionEntity().convertToEntity(created);
  }

  async update(_session: OperatorSessionEntity): Promise<OperatorSessionEntity> {
    const requiredFields: string[] = ['_id'];
    this.checkRequiredFields(requiredFields, _session);
    const sessionToUpdate: OperatorSessionSchema = _session.convertToSchema();
    const updated = await OperatorSessionModel.findOneAndUpdate({ _id: _session.getId() }, { $set: sessionToUpdate }, { new: true });
    return new OperatorSessionEntity().convertToEntity(updated);
  }

  async getById(_id: Types.ObjectId): Promise<OperatorSessionEntity> {
    const found = await OperatorSessionModel.findOne({ _id });
    return new OperatorSessionEntity().convertToEntity(found);
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<OperatorSessionEntity>> {
    const operatorSessions = await OperatorSessionModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter(operatorSessions, OperatorSessionEntity);
  }

  async countDocumentsByFilter(filter: object): Promise<number> {
    return OperatorSessionModel.countDocuments(filter);
  }

  async getByOperatorId(operator: Types.ObjectId): Promise<OperatorSessionEntity> {
    const found = await OperatorSessionModel.findOne({
      operator,
      status: { $ne: OperatorSessionStatusEnum.INACTIVE },
    }).sort({
      createdAt: -1,
    });
    return new OperatorSessionEntity().convertToEntity(found);
  }

  async setUsedTime(_id: Types.ObjectId): Promise<OperatorSessionEntity> {
    const data: any = {
      usedAt: moment().toDate(),
    };

    const updated = await OperatorSessionModel.findOneAndUpdate({ _id }, { $set: data }, { new: true });
    return new OperatorSessionEntity().convertToEntity(updated);
  }

  async deActivate(_id: Types.ObjectId): Promise<OperatorSessionEntity> {
    const updated = await OperatorSessionModel.findByIdAndUpdate(_id, { $set: { status: OperatorSessionStatusEnum.INACTIVE } }, { new: true });
    return new OperatorSessionEntity().convertToEntity(updated);
  }

  async deActivateAllByOperator(operatorId: Types.ObjectId): Promise<void> {
    const updated = await OperatorSessionModel.updateMany({ operator: operatorId }, { $set: { status: OperatorSessionStatusEnum.INACTIVE } });
  }
}
