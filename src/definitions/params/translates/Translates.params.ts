import * as Joi from 'joi';

export class TranslatesParams {
  uz: string;

  ru: string;

  en: string;

  kaa?: string;

  constructor(params: TranslatesParams) {
    if (params) {
      this.uz = params.uz;
      this.ru = params.ru;
      this.en = params.en;
      this.kaa = params?.kaa;
    }
  }

  async validate() {
    return await TranslatesParamsSchema.validateAsync(this);
  }
}

export const TranslatesParamsSchema = Joi.object<TranslatesParams>({
  uz: Joi.string().trim().required(),
  ru: Joi.string().trim().required(),
  en: Joi.string().trim().required(),
  kaa: Joi.string().trim().allow(null),
});
