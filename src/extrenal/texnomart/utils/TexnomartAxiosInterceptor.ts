import axios from 'axios';
import { ErrorCodeEnum, ExternalServiceError } from '../../../definitions';

function addInterceptors(contentType = 'application/json') {
  const texnomartAxios = axios.create();
  texnomartAxios.interceptors.request.use(async config => {
    const texnomartHeaderConfig = {
      'Content-Type': contentType,
    };
    config.headers = { ...config.headers, ...texnomartHeaderConfig, 'request-startTime': new Date().getTime() };
    return config;
  });

  texnomartAxios.interceptors.response.use(
    async response => {
      if (response?.data?.error) {
        throw new ExternalServiceError('Texnomart', ErrorCodeEnum.TEXNOMART_SERVICE_ERROR);
      }
      return response;
    },
    error => {
      let body = error?.response?.data || {};
      throw new ExternalServiceError('Texnomart', ErrorCodeEnum.TEXNOMART_SERVICE_ERROR);
    },
  );
  return texnomartAxios;
}

export const texnomartAxiosInterceptor = addInterceptors;
