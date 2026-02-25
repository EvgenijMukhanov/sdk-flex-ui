import type { HttpOptions, HttpResponse } from './types';
import { buildUrl } from './helpers/buildUrl';
import { buildHeaders } from './helpers/buildHeaders';
import { shouldIncludeBody } from './helpers/shouldIncludeBody';
import { parseResponse } from './helpers/parseResponse';
import { getStatusCodeText } from './helpers/getStatusCodeText';

/**
 * Выполняет HTTP-запрос (GET, POST, PUT, DELETE, PATCH)
 *
 * @param options - Опции запроса
 * @returns Promise с результатом запроса (успех или ошибка)
 */
export async function http<T = unknown>(
  options: HttpOptions
): Promise<HttpResponse<T>> {
  const {
    url,
    method,
    headers = {},
    body,
    timeout,
    baseUrl,
    params,
    validateStatus = (status) => status >= 200 && status < 300,
  } = options;

  // Формируем полный URL
  const fullUrl = buildUrl(url, baseUrl, params);

  const controller = new AbortController();
  const timeoutId = timeout
    ? setTimeout(() => controller.abort(), timeout)
    : null;

  try {
    const fetchOptions: RequestInit = {
      method,
      headers: buildHeaders(headers, method, body),
      signal: controller.signal,
    };

    // Добавляем тело запроса для методов POST, PUT, PATCH
    if (body && shouldIncludeBody(method)) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, fetchOptions);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const responseData = await parseResponse<T>(response);

    // Проверяем статус через validateStatus
    if (!validateStatus(response.status)) {
      return {
        success: false,
        status: response.status,
        statusText: response.statusText || getStatusCodeText(response.status),
        error: {
          code: response.status.toString(),
          message:
            (responseData as { message?: string })?.message ||
            response.statusText ||
            getStatusCodeText(response.status),
          details: responseData,
        },
      };
    }

    return {
      success: true,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: responseData as T,
    };
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Обработка отмены запроса по таймауту
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        status: 408,
        statusText: 'Request Timeout',
        error: {
          code: 'TIMEOUT',
          message: 'Превышено время ожидания ответа',
        },
      };
    }

    // Обработка сетевых ошибок
    return {
      success: false,
      status: 0,
      statusText: 'Network Error',
      error: {
        code: 'NETWORK_ERROR',
        message:
          error instanceof Error ? error.message : 'Неизвестная ошибка сети',
      },
    };
  }
}
