import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { http } from './http';

describe('http', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET запросы', () => {
    it('должен выполнять успешный GET запрос', async () => {
      const mockData = { id: 1, name: 'Test' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const result = await http({ url: '/api/test', method: 'GET' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
        expect(result.status).toBe(200);
      }
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.any(Object)
      );
    });

    it('должен выполнять GET запрос с query параметрами', async () => {
      const mockData = { items: [] };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      await http({
        url: '/api/users',
        method: 'GET',
        params: { page: 1, limit: 10 },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users?page=1&limit=10',
        expect.any(Object)
      );
    });

    it('должен выполнять GET запрос с baseUrl', async () => {
      const mockData = { value: 'test' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      await http({
        baseUrl: 'https://api.example.com',
        url: '/data',
        method: 'GET',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.any(Object)
      );
    });
  });

  describe('POST запросы', () => {
    it('должен выполнять успешный POST запрос с телом', async () => {
      const mockData = { id: 123, created: true };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const body = { name: 'New Item', value: 42 };
      const result = await http({
        url: '/api/items',
        method: 'POST',
        body,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
        expect(result.status).toBe(201);
      }

      const callArgs = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(callArgs[1]?.body).toBe(JSON.stringify(body));
    });
  });

  describe('PUT запросы', () => {
    it('должен выполнять успешный PUT запрос с телом', async () => {
      const mockData = { id: 1, updated: true };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const body = { name: 'Updated Item' };
      const result = await http({
        url: '/api/items/1',
        method: 'PUT',
        body,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
      }
    });
  });

  describe('DELETE запросы', () => {
    it('должен выполнять успешный DELETE запрос', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        headers: new Headers(),
      });

      const result = await http({
        url: '/api/items/1',
        method: 'DELETE',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.status).toBe(204);
      }
    });
  });

  describe('Обработка ошибок', () => {
    it('должен возвращать ошибку при статусе 400', async () => {
      const errorData = { message: 'Invalid input' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => errorData,
      });

      const result = await http({ url: '/api/test', method: 'GET' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.status).toBe(400);
        expect(result.error.code).toBe('400');
        expect(result.error.message).toBe('Invalid input');
      }
    });

    it('должен возвращать ошибку при статусе 404', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      const result = await http({ url: '/api/not-found', method: 'GET' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.status).toBe(404);
        expect(result.error.message).toBe('Not Found');
      }
    });

    it('должен возвращать ошибку при статусе 500', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      const result = await http({ url: '/api/error', method: 'GET' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.status).toBe(500);
        expect(result.error.message).toBe('Internal Server Error');
      }
    });

    it('должен обрабатывать таймаут запроса', async () => {
      const abortError = new Error('AbortError');
      abortError.name = 'AbortError';

      (global.fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(abortError), 100);
          })
      );

      const result = await http({
        url: '/api/slow',
        method: 'GET',
        timeout: 10,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.status).toBe(408);
        expect(result.error.code).toBe('TIMEOUT');
      }
    });

    it('должен обрабатывать сетевую ошибку', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await http({ url: '/api/test', method: 'GET' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.status).toBe(0);
        expect(result.error.code).toBe('NETWORK_ERROR');
        expect(result.error.message).toBe('Network error');
      }
    });
  });

  describe('Заголовки', () => {
    it('должен добавлять кастомные заголовки', async () => {
      const mockData = { data: 'test' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      await http({
        url: '/api/test',
        method: 'GET',
        headers: { 'X-Custom-Header': 'value' },
      });

      const callArgs = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(
        (callArgs[1]?.headers as Record<string, string>)['X-Custom-Header']
      ).toBe('value');
    });
  });

  describe('validateStatus', () => {
    it('должен использовать кастомную валидацию статуса', async () => {
      const mockData = { data: 'test' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const result = await http({
        url: '/api/test',
        method: 'GET',
        validateStatus: (status) => status < 500,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
      }
    });
  });
});
