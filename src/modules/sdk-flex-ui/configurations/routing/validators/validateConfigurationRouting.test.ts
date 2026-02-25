import { describe, it, expect } from 'vitest';
import { validateConfigurationRouting } from './validateConfigurationRouting';

describe('validateConfigurationRouting', () => {
  it('должен вернуть success: false для не-объекта', () => {
    expect(validateConfigurationRouting(null)).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting(undefined)).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting('string')).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting(123)).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting(true)).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting([])).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });
  });

  it('должен вернуть success: false для объекта без ключа routing', () => {
    expect(validateConfigurationRouting({})).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting({ name: 'test' })).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });
  });

  it('должен вернуть success: false, если routing не массив', () => {
    expect(validateConfigurationRouting({ routing: 'not-array' })).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting({ routing: {} })).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting({ routing: 123 })).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });

    expect(validateConfigurationRouting({ routing: null })).toEqual({
      success: false,
      data: undefined,
      errors: undefined,
    });
  });

  it('должен вернуть success: true для пустого массива routing', () => {
    const result = validateConfigurationRouting({ routing: [] });

    expect(result).toEqual({
      success: true,
      data: undefined,
      errors: undefined,
    });
  });

  it('должен вернуть success: true для массива с валидными элементами', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route2', route: '/path2' },
      ],
    });

    expect(result).toEqual({
      success: true,
      data: {
        routing: [
          { name: 'route1', route: '/path1' },
          { name: 'route2', route: '/path2' },
        ],
      },
      errors: undefined,
    });
  });

  it('должен вернуть success: false для массива с невалидными элементами', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 123, route: '/path1' },
        { name: 'route2', route: null },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual({
      routing: [
        { name: 123, route: '/path1' },
        { name: 'route2', route: null },
      ],
    });
  });

  it('должен разделить валидные и невалидные элементы', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'valid', route: '/valid' },
        { name: 123, route: '/invalid' },
        { name: 'also-valid', route: '/also-valid' },
        { name: 'invalid-no-route', other: 'field' },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.data).toEqual({
      routing: [
        { name: 'valid', route: '/valid' },
        { name: 'also-valid', route: '/also-valid' },
      ],
    });
    expect(result.errors).toEqual({
      routing: [
        { name: 123, route: '/invalid' },
        { name: 'invalid-no-route', other: 'field' },
      ],
    });
  });

  it('должен считать валидным элемент с дополнительными полями', () => {
    const result = validateConfigurationRouting({
      routing: [{ name: 'route', route: '/path', extra: 'field', id: 123 }],
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      routing: [{ name: 'route', route: '/path', extra: 'field', id: 123 }],
    });
    expect(result.errors).toBeUndefined();
  });

  it('должен считать невалидным элемент без поля name', () => {
    const result = validateConfigurationRouting({
      routing: [{ route: '/path' }],
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual({
      routing: [{ route: '/path' }],
    });
  });

  it('должен считать невалидным элемент без поля route', () => {
    const result = validateConfigurationRouting({
      routing: [{ name: 'route' }],
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual({
      routing: [{ name: 'route' }],
    });
  });

  it('должен считать невалидным элемент с name не строкой', () => {
    const result = validateConfigurationRouting({
      routing: [{ name: 123, route: '/path' }],
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual({
      routing: [{ name: 123, route: '/path' }],
    });
  });

  it('должен считать невалидным элементом с route не строкой', () => {
    const result = validateConfigurationRouting({
      routing: [{ name: 'route', route: 123 }],
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual({
      routing: [{ name: 'route', route: 123 }],
    });
  });

  it('должен вернуть success: false при дубликате name', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route1', route: '/path2' },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.data).toEqual({
      routing: [{ name: 'route1', route: '/path1' }],
    });
    expect(result.errors).toEqual({
      routing: [{ name: 'route1', route: '/path2' }],
    });
  });

  it('должен вернуть success: false при дубликате route', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'route1', route: '/path' },
        { name: 'route2', route: '/path' },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.data).toEqual({
      routing: [{ name: 'route1', route: '/path' }],
    });
    expect(result.errors).toEqual({
      routing: [{ name: 'route2', route: '/path' }],
    });
  });

  it('должен вернуть success: false при дубликатах name и route', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route1', route: '/path2' },
        { name: 'route2', route: '/path1' },
        { name: 'route3', route: '/path3' },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.data).toEqual({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route3', route: '/path3' },
      ],
    });
    expect(result.errors).toEqual({
      routing: [
        { name: 'route1', route: '/path2' },
        { name: 'route2', route: '/path1' },
      ],
    });
  });

  it('должен вернуть success: true для уникальных name и route', () => {
    const result = validateConfigurationRouting({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route2', route: '/path2' },
        { name: 'route3', route: '/path3' },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      routing: [
        { name: 'route1', route: '/path1' },
        { name: 'route2', route: '/path2' },
        { name: 'route3', route: '/path3' },
      ],
    });
    expect(result.errors).toBeUndefined();
  });
});
