import { AxiosError } from 'axios';

export const formatServerError = (error: AxiosError): string => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data as any;
    
    const serverMessage = data?.message || data?.error || data?.detail;
    
    if (status === 400) return serverMessage || 'Неверный запрос';
    if (status === 404) return 'Ресурс не найден';
    if (status >= 500) return 'Внутренняя ошибка сервера';
    
    return serverMessage || `Ошибка HTTP ${status}`;
  }
  
  if (error.code === 'ERR_NETWORK') {
    return 'Ошибка сети. Сервер недоступен';
  }
  
  if (error.code === 'ECONNABORTED') {
    return 'Таймаут запроса';
  }
  
  return error.message || 'Неизвестная ошибка';
};