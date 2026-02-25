/**
 * Результат успешного HTTP-запроса
 */
export interface HttpSuccessResponse<T> {
  success: true;
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * Результат ошибочного HTTP-запроса
 */
export interface HttpErrorResponse {
  success: false;
  status: number;
  statusText: string;
  error: {
    code: string;
    message?: string;
    details?: unknown;
  };
}

/**
 * Тип ответа HTTP-запроса
 */
export type HttpResponse<T = unknown> =
  | HttpSuccessResponse<T>
  | HttpErrorResponse;

/**
 * HTTP-методы
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Опции для HTTP-запроса
 */
export interface HttpOptions {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  /**
   * Базовый URL для запроса. Если указан, url будет добавлен к baseUrl
   */
  baseUrl?: string;
  /**
   * Query-параметры
   */
  params?: Record<string, string | number | boolean | undefined | null>;
  /**
   * Не бросать ошибку при неуспешном статусе (по умолчанию true)
   */
  validateStatus?: (status: number) => boolean;
}
