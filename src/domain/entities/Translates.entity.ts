import { TranslatesSchema } from '../../database';
import { BaseEntityInterface, LanguageEnum } from '../../definitions';

export class TranslatesEntity implements BaseEntityInterface<TranslatesEntity, TranslatesSchema> {
  protected _uz?: string;
  protected _ru?: string;
  protected _en?: string;
  protected _kaa?: string;

  /** Builders */
  buildUz(uz: string): TranslatesEntity {
    this._uz = uz;
    return this;
  }

  buildRu(ru: string): TranslatesEntity {
    this._ru = ru;
    return this;
  }

  buildEn(en: string): TranslatesEntity {
    this._en = en;
    return this;
  }

  buildKaa(kaa: string): TranslatesEntity {
    this._kaa = kaa;
    return this;
  }

  /** Getters */
  getUz(): string {
    return this._uz;
  }

  getRu(): string {
    return this._ru;
  }

  getEn(): string {
    return this._en;
  }

  getKaa(): string {
    return this._kaa;
  }

  getByLang(lang: string = LanguageEnum.UZ): string {
    return this[`_${lang}`] ?? this[`_${LanguageEnum.UZ}`];
  }

  convertToEntity(translate: TranslatesSchema): TranslatesEntity {
    if (!translate) return null;
    this.buildUz(translate.uz).buildRu(translate.ru).buildEn(translate.en).buildKaa(translate.kaa);
    return this;
  }

  convertToSchema(): TranslatesSchema {
    if (!this) return null;
    return {
      uz: this.getUz(),
      ru: this.getRu(),
      en: this.getEn(),
      kaa: this.getKaa(),
    };
  }
}
