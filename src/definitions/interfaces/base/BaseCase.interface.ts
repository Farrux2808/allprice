import { LanguageEnum } from '../../enums';

interface BaseRequestInterface {
  client?: any; // ClientEntity, AdminEntity
  baseLang?: LanguageEnum;
}

export type BaseCaseParamsInterface<T> = T & BaseRequestInterface;

export interface BaseCaseInterface<IRequest, IResponse> {
  execute(request?: BaseCaseParamsInterface<IRequest>): Promise<IResponse>;
}
