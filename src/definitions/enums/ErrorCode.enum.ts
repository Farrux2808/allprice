export enum ErrorCodeEnum {
  /**
   * General errors
   */
  REQUIRED_FIELD_ERROR = 2000,
  AUTHORIZATION_ERROR = 2002,
  REQUIREMENT_ERROR = 2003,
  VALIDATION_FAIL_TO_MATCH_ERROR = 2004,
  NOT_FOUND = 2005,
  EMAIL_ALREADY_EXISTS_ERROR = 2006,
  OPERATOR_OLD_PASSWORD_INCORRECT_ERROR = 2007,

  /**
   * Authorization Errors
   */
  TOKEN_NOT_PROVIDED_ERROR = 3000,
  TOKEN_EXPIRED_ERROR = 3001,
  INVALID_TOKEN_ERROR = 3002,
  ACCESS_DENIED_ERROR = 3003,
  OPERATOR_IS_NOT_ACTIVE_ERROR = 3004,
  LOGIN_OR_PASSWORD_INCORRECT_ERROR = 3005,
  OPERATOR_IS_NOT_DELETABLE = 3006,
  OPERATOR_NEED_TO_CHANGE_PASSWORD_ERROR = 3007,

  /**
   * External Errors
   */

  EXTERNAL_SERVICE_ERROR = 4000,
  OLCHA_SERVICE_ERROR = 4001,
  TEXNOMART_SERVICE_ERROR = 4002,
}
