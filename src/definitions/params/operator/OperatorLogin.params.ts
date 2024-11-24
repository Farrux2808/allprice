import * as Joi from 'joi';

export class OperatorLoginParams {
  /** Электронная почта оператора */
  email: string;

  /** Пароль оператора */
  password: string;

  constructor(params: OperatorLoginParams) {
    if (params) {
      this.email = params.email;
      this.password = params.password;
    }
  }

  async validate() {
    return await OperatorLoginParamsSchema.validateAsync(this);
  }
}

export const OperatorLoginParamsSchema = Joi.object<OperatorLoginParams>({
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().required().regex(new RegExp('^[A-Fa-f0-9]{40}$')),
});
