import { describe, it, expect, vi } from 'vitest';
import { parseResponse } from './parseResponse';

describe('parseResponse', () => {
  const createMockResponse = (
    contentType: string | null,
    status: number,
    jsonData?: unknown,
    textData?: string
  ) => {
    return {
      status,
      headers: new Headers(
        contentType ? { 'content-type': contentType } : undefined
      ),
      json: vi.fn().mockResolvedValue(jsonData),
      text: vi.fn().mockResolvedValue(textData || ''),
    } as unknown as Response;
  };

  it('должен возвращать пустой объект для 204 No Content', async () => {
    const response = createMockResponse(null, 204);
    const result = await parseResponse(response);
    expect(result).toEqual({});
  });

  it('должен возвращать пустой объект для 205 Reset Content', async () => {
    const response = createMockResponse(null, 205);
    const result = await parseResponse(response);
    expect(result).toEqual({});
  });

  it('должен парсить JSON ответ', async () => {
    const mockData = { id: 1, name: 'Test' };
    const response = createMockResponse('application/json', 200, mockData);
    const result = await parseResponse(response);
    expect(result).toEqual(mockData);
  });

  it('должен возвращать пустой объект при ошибке парсинга JSON', async () => {
    const response = createMockResponse('application/json', 200);
    (response.json as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Invalid JSON')
    );
    const result = await parseResponse(response);
    expect(result).toEqual({});
  });

  it('должен парсить текстовый ответ', async () => {
    const response = createMockResponse('text/plain', 200, undefined, 'Hello');
    const result = await parseResponse(response);
    expect(result).toBe('Hello');
  });

  it('должен возвращать пустой объект при ошибке парсинга текста', async () => {
    const response = createMockResponse('text/plain', 200);
    (response.text as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Read error')
    );
    const result = await parseResponse(response);
    expect(result).toEqual({});
  });

  it('должен пытаться парсить как JSON, если content-type не указан', async () => {
    const mockData = { value: 'test' };
    const response = createMockResponse(null, 200, mockData);
    const result = await parseResponse(response);
    expect(result).toEqual(mockData);
  });

  it('должен возвращать пустой объект, если парсинг не удался', async () => {
    const response = createMockResponse(null, 200);
    (response.json as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Parse error')
    );
    const result = await parseResponse(response);
    expect(result).toEqual({});
  });

  it('должен парсить JSON с content-type application/problem+json', async () => {
    const mockData = { error: 'Something went wrong' };
    const response = createMockResponse(
      'application/problem+json',
      400,
      mockData
    );
    const result = await parseResponse(response);
    expect(result).toEqual(mockData);
  });
});
