import { TranslatesSchema } from '../../database';

export class BaseError extends Error {
  code: number;
  translates: TranslatesSchema;
  stack: string;
  details: object;

  constructor(
    message: string,
    translates: TranslatesSchema = {
      en: `Custom error`,
      ru: `Пользовательская ошибка`,
      uz: `Maxsus xato`,
      kaa: `Arnawlı qáte`,
    },
    code = 1000,
    stack?: string,
    details?: object,
  ) {
    super(message);
    this.code = code;
    this.translates = translates;
    this.stack = stack;
    this.details = details;
  }
}
