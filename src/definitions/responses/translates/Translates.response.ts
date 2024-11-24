import { TranslatesEntity } from '../../../domain';

export class TranslatesResponse {
  uz: string;

  ru: string;

  en: string;

  kaa?: string;

  constructor(params: TranslatesEntity) {
    if (params && params instanceof TranslatesEntity) {
      this.uz = params.getUz();
      this.ru = params.getRu();
      this.en = params.getEn();
      this.kaa = params?.getKaa();
    }
  }
}
