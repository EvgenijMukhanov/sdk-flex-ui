import { describe, it, expect } from 'vitest';
import { buildUrl } from './buildUrl';

describe('buildUrl', () => {
  it('должен возвращать URL без изменений, если нет baseUrl и params', () => {
    const result = buildUrl('/api/users');
    expect(result).toBe('/api/users');
  });

  it('должен объединять baseUrl и url', () => {
    const result = buildUrl('/users', 'https://api.example.com');
    expect(result).toBe('https://api.example.com/users');
  });

  it('должен убирать trailing slash у baseUrl', () => {
    const result = buildUrl('/users', 'https://api.example.com/');
    expect(result).toBe('https://api.example.com/users');
  });

  it('должен убирать leading slash у url', () => {
    const result = buildUrl('users', 'https://api.example.com');
    expect(result).toBe('https://api.example.com/users');
  });

  it('должен добавлять query параметры', () => {
    const result = buildUrl('/api/users', undefined, {
      page: 1,
      limit: 10,
    });
    expect(result).toBe('/api/users?page=1&limit=10');
  });

  it('должен объединять baseUrl, url и params', () => {
    const result = buildUrl('/users', 'https://api.example.com', {
      page: 1,
    });
    expect(result).toBe('https://api.example.com/users?page=1');
  });

  it('должен фильтровать undefined значения в params', () => {
    const result = buildUrl('/api/users', undefined, {
      page: 1,
      search: undefined,
      limit: 10,
    });
    expect(result).toBe('/api/users?page=1&limit=10');
  });

  it('должен фильтровать null значения в params', () => {
    const result = buildUrl('/api/users', undefined, {
      page: 1,
      search: null,
      limit: 10,
    });
    expect(result).toBe('/api/users?page=1&limit=10');
  });

  it('должен добавлять boolean параметры', () => {
    const result = buildUrl('/api/users', undefined, {
      active: true,
      archived: false,
    });
    expect(result).toBe('/api/users?active=true&archived=false');
  });

  it('должен добавлять строковые параметры', () => {
    const result = buildUrl('/api/users', undefined, {
      search: 'john',
    });
    expect(result).toBe('/api/users?search=john');
  });

  it('должен возвращать URL без query строки, если params пустой', () => {
    const result = buildUrl('/api/users', undefined, {});
    expect(result).toBe('/api/users');
  });
});
