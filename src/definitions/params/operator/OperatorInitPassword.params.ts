import * as Joi from 'joi';

export class OperatorInitPasswordParams {
  /** Operator new password */
  oldPassword: string;

  /** Operator old password */
  newPassword: string;

  constructor(params: OperatorInitPasswordParams) {
    if (params) {
      this.oldPassword = params.oldPassword;
      this.newPassword = params.newPassword;
    }
  }

  async validate() {
    return await OperatorInitPasswordParamsSchema.validateAsync(this);
  }
}

export const OperatorInitPasswordParamsSchema = Joi.object<OperatorInitPasswordParams>({
  oldPassword: Joi.string().trim().required().regex(new RegExp('^[A-Fa-f0-9]{40}$')),
  newPassword: Joi.string().trim().required().regex(new RegExp('^[A-Fa-f0-9]{40}$')),
});
