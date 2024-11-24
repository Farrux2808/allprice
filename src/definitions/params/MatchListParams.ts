import { ListParams } from './ListParams';
import * as Joi from 'joi';

export class MatchListParams extends ListParams {
  /** Соответствие для поиска */
  match: string;

  constructor(params: MatchListParams) {
    if (params) {
      super(params);
      this.match = params.match;
    }
  }

  async validate() {
    return await BaseMatchParamsSchema.validateAsync(this);
  }
}

export const BaseMatchParamsSchema = Joi.object<MatchListParams>({
  match: Joi.string().trim().max(30).empty('').default(''),
  page: Joi.number().max(999999999).empty(1).default(1),
  size: Joi.number().max(999999999).empty(10).default(10),
});
