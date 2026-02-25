/**
 * Парсирует ответ сервера
 */
export const parseResponse = async <T>(
  response: Response
): Promise<T | unknown> => {
  // Если ответ пустой (например, 204 No Content)
  if (response.status === 204 || response.status === 205) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');

  // Если контент JSON
  if (contentType?.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  }

  // Если контент текстовый
  if (contentType?.includes('text/')) {
    try {
      return (await response.text()) as unknown as T;
    } catch {
      return {} as T;
    }
  }

  // Пытаемся прочитать как JSON, иначе возвращаем пустой объект
  try {
    return await response.json();
  } catch {
    return {} as T;
  }
};
