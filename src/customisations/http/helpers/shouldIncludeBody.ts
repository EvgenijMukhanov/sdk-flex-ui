import type { HttpMethod } from '../types';

/**
 * Определяет, нужно ли включать тело запроса
 */
export const shouldIncludeBody = (method: HttpMethod): boolean =>
  ['POST', 'PUT', 'PATCH'].includes(method);
