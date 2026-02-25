import type { HttpMethod } from '../types';

/**
 * Формирует заголовки запроса
 */
export const buildHeaders = (
  headers: Record<string, string>,
  method: HttpMethod,
  body?: unknown
): Record<string, string> => {
  const result: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Не добавляем Content-Type для GET/DELETE запросов без body
  if (!body && ['GET', 'DELETE'].includes(method)) {
    delete result['Content-Type'];
  }

  return result;
};
