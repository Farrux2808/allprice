import { Types } from 'mongoose';
import * as Joi from 'joi';

export class CreateOperatorParams {
  fullName: string;

  email?: string;

  roles?: Array<Types.ObjectId>;

  constructor(params: CreateOperatorParams) {
    this.fullName = params.fullName;
    this.email = params.email;
    this.roles = params.roles;
  }

  async validate() {
    return await CreateOperatorParamsSchema.validateAsync(this);
  }
}

export const CreateOperatorParamsSchema = Joi.object<CreateOperatorParams>({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  roles: Joi.array()
    .items(Joi.string().trim().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required())
    .min(1)
    .required(),
});
