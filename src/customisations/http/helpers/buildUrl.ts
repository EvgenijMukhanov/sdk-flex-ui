/**
 * Строит полный URL с query-параметрами
 */
export const buildUrl = (
  url: string,
  baseUrl?: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string => {
  // Объединяем baseUrl и url
  const fullUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
    : url;

  // Если нет параметров, возвращаем URL как есть
  if (!params || Object.keys(params).length === 0) {
    return fullUrl;
  }

  // Создаём URLSearchParams, фильтруя undefined и null
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
};
