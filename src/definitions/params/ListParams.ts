import * as Joi from 'joi';

export class ListParams {
  /** Страница */
  page: number;

  /** Размер на странице */
  size: number;

  constructor(params: ListParams) {
    if (params) {
      this.page = params.page;
      this.size = params.size;
    }
  }

  async validate() {
    return await BaseSchemaParams.validateAsync(this);
  }
}

export const BaseSchemaParams = Joi.object<ListParams>({
  page: Joi.number().max(999999999).empty(1).default(1),
  size: Joi.number().max(999999999).empty(10).default(10),
});
