import axios from 'axios';
import { ErrorCodeEnum, ExternalServiceError } from '../../../definitions';

function addInterceptors(contentType = 'application/json') {
  const olchaAxios = axios.create();
  olchaAxios.interceptors.request.use(async config => {
    const olchaHeaderConfig = {
      'Content-Type': contentType,
    };
    config.headers = { ...config.headers, ...olchaHeaderConfig, 'request-startTime': new Date().getTime() };
    return config;
  });

  olchaAxios.interceptors.response.use(
    async response => {
      if (response?.data?.error) {
        throw new ExternalServiceError('Olcha', ErrorCodeEnum.OLCHA_SERVICE_ERROR);
      }
      return response;
    },
    error => {
      let body = error?.response?.data || {};
      throw new ExternalServiceError('Olcha', ErrorCodeEnum.OLCHA_SERVICE_ERROR);
    },
  );
  return olchaAxios;
}

export const olchaAxiosInterceptor = addInterceptors;
