import * as Joi from 'joi';
import { OperatorStatusEnum } from '../../enums';

export class GetOperatorListParams {
  page: number;

  size: number;

  fullName: string;

  status: OperatorStatusEnum | 'all';

  constructor(params: GetOperatorListParams) {
    if (params) {
      this.page = params.page;
      this.size = params.size;
      this.fullName = params.fullName;
      this.status = params.status;
    }
  }

  async validate() {
    return await GetOperatorListParamsSchema.validateAsync(this);
  }
}

export const GetOperatorListParamsSchema = Joi.object<GetOperatorListParams>({
  page: Joi.number().max(999999999).empty(1).default(1),
  size: Joi.number().max(1000).empty(10).default(10),
  fullName: Joi.string().trim().empty(''),
  status: Joi.number().valid(...Object.values(OperatorStatusEnum), 'all'),
});
