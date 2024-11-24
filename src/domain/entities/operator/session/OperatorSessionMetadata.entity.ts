import { OperatorSessionMetadataSchema } from '../../../../database';
import { LanguageEnum } from '../../../../definitions';

export class OperatorSessionMetadataEntity {
  protected _ipAddress?: string;
  protected _osName?: string;
  protected _osVersion?: string;
  protected _osSdkVersion?: string;
  protected _model?: string;
  protected _userAgent?: string;
  protected _vendor?: string;
  protected _architecture?: string;
  protected _dpi?: string;
  protected _lang?: LanguageEnum;
  protected _phoneNumber?: string;
  protected _appVersion?: string;

  /** Builders */
  buildIpAddress(ipAddress: string): OperatorSessionMetadataEntity {
    this._ipAddress = ipAddress;
    return this;
  }

  buildOSName(osName: string): OperatorSessionMetadataEntity {
    this._osName = osName;
    return this;
  }

  buildOSVersion(osVersion: string): OperatorSessionMetadataEntity {
    this._osVersion = osVersion;
    return this;
  }

  buildOSSdkVersion(osSdkVersion: string): OperatorSessionMetadataEntity {
    this._osSdkVersion = osSdkVersion;
    return this;
  }

  buildModel(model: string): OperatorSessionMetadataEntity {
    this._model = model;
    return this;
  }

  buildUserAgent(userAgent: string): OperatorSessionMetadataEntity {
    this._userAgent = userAgent;
    return this;
  }

  buildLang(lang: LanguageEnum): OperatorSessionMetadataEntity {
    this._lang = lang;
    return this;
  }

  buildVendor(vendor: string): OperatorSessionMetadataEntity {
    this._vendor = vendor;
    return this;
  }

  buildPhoneNumber(phoneNumber: string): OperatorSessionMetadataEntity {
    this._phoneNumber = phoneNumber;
    return this;
  }

  buildArchitecture(architecture: string): OperatorSessionMetadataEntity {
    this._architecture = architecture;
    return this;
  }

  buildDPI(dpi: string): OperatorSessionMetadataEntity {
    this._dpi = dpi;
    return this;
  }

  buildAppVersion(appVersion: string): OperatorSessionMetadataEntity {
    this._appVersion = appVersion;
    return this;
  }

  /** Getters */
  getIpAddress(): string {
    return this._ipAddress;
  }

  getOSName(): string {
    return this._osName;
  }

  getOSVersion(): string {
    return this._osVersion;
  }

  getOSSdkVersion(): string {
    return this._osSdkVersion;
  }

  getModel(): string {
    return this._model;
  }

  getVendor(): string {
    return this._vendor;
  }

  getLang(): LanguageEnum {
    return this._lang;
  }

  getUserAgent(): string {
    return this._userAgent;
  }

  getPhoneNumber(): string {
    return this._phoneNumber;
  }

  getArchitecture(): string {
    return this._architecture;
  }

  getDPI(): string {
    return this._dpi;
  }

  getAppVersion(): string {
    return this._appVersion;
  }

  convertToEntity(sessionMetadata: OperatorSessionMetadataSchema): OperatorSessionMetadataEntity {
    if (!sessionMetadata) return null;
    this.buildIpAddress(sessionMetadata.ipAddress)
      .buildAppVersion(sessionMetadata.appVersion)
      .buildDPI(sessionMetadata.dpi)
      .buildModel(sessionMetadata.model)
      .buildLang(sessionMetadata.lang)
      .buildOSName(sessionMetadata.osName)
      .buildOSVersion(sessionMetadata.osVersion)
      .buildOSSdkVersion(sessionMetadata.osSdkVersion)
      .buildArchitecture(sessionMetadata.architecture)
      .buildPhoneNumber(sessionMetadata.phoneNumber)
      .buildVendor(sessionMetadata.vendor)
      .buildUserAgent(sessionMetadata.userAgent);

    return this;
  }

  convertToSchema(): OperatorSessionMetadataSchema {
    if (!this) return null;
    return {
      ipAddress: this.getIpAddress(),
      osName: this.getOSName(),
      osVersion: this.getOSVersion(),
      osSdkVersion: this.getOSSdkVersion(),
      model: this.getModel(),
      userAgent: this.getUserAgent(),
      vendor: this.getVendor(),
      architecture: this.getArchitecture(),
      dpi: this.getDPI(),
      lang: this.getLang(),
      phoneNumber: this.getPhoneNumber(),
      appVersion: this.getAppVersion(),
    };
  }
}
