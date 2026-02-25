import { describe, it, expect } from 'vitest';
import { buildHeaders } from './buildHeaders';

describe('buildHeaders', () => {
  it('должен удалять Content-Type для GET без body', () => {
    const result = buildHeaders({}, 'GET');
    expect(result['Content-Type']).toBeUndefined();
  });

  it('должен удалять Content-Type для DELETE без body', () => {
    const result = buildHeaders({}, 'DELETE');
    expect(result['Content-Type']).toBeUndefined();
  });

  it('должен добавлять кастомные заголовки', () => {
    const result = buildHeaders({ 'X-Custom': 'value' }, 'GET');
    expect(result['X-Custom']).toBe('value');
  });

  it('должен сохранять Content-Type для GET с body', () => {
    const result = buildHeaders({}, 'GET', { data: 'test' });
    expect(result['Content-Type']).toBe('application/json');
  });

  it('должен сохранять Content-Type для DELETE с body', () => {
    const result = buildHeaders({}, 'DELETE', { data: 'test' });
    expect(result['Content-Type']).toBe('application/json');
  });

  it('должен сохранять Content-Type для POST', () => {
    const result = buildHeaders({}, 'POST', { data: 'test' });
    expect(result['Content-Type']).toBe('application/json');
  });

  it('должен сохранять Content-Type для PUT', () => {
    const result = buildHeaders({}, 'PUT', { data: 'test' });
    expect(result['Content-Type']).toBe('application/json');
  });

  it('должен сохранять Content-Type для PATCH', () => {
    const result = buildHeaders({}, 'PATCH', { data: 'test' });
    expect(result['Content-Type']).toBe('application/json');
  });

  it('должен позволять переопределять Content-Type', () => {
    const result = buildHeaders({ 'Content-Type': 'text/plain' }, 'POST', {
      data: 'test',
    });
    expect(result['Content-Type']).toBe('text/plain');
  });
});
