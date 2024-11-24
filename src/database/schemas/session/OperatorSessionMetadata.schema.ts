import { prop } from '@typegoose/typegoose';
import { LanguageEnum } from '../../../definitions';

export class OperatorSessionMetadataSchema {
  @prop()
  ipAddress?: string;

  @prop()
  osName?: string;

  @prop()
  osVersion?: string;

  @prop()
  osSdkVersion?: string;

  @prop()
  model?: string;

  @prop()
  userAgent?: string;

  @prop()
  vendor?: string;

  @prop()
  architecture?: string;

  @prop()
  dpi?: string;

  /** Язык пользователя */
  @prop()
  lang?: LanguageEnum;

  /** Телефон пользователя */
  @prop()
  phoneNumber?: string;

  @prop()
  appVersion?: string;
}
