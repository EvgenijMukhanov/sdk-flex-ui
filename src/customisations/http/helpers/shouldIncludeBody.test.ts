import { describe, it, expect } from 'vitest';
import { shouldIncludeBody } from './shouldIncludeBody';

describe('shouldIncludeBody', () => {
  it('должен возвращать false для GET', () => {
    expect(shouldIncludeBody('GET')).toBe(false);
  });

  it('должен возвращать false для DELETE', () => {
    expect(shouldIncludeBody('DELETE')).toBe(false);
  });

  it('должен возвращать true для POST', () => {
    expect(shouldIncludeBody('POST')).toBe(true);
  });

  it('должен возвращать true для PUT', () => {
    expect(shouldIncludeBody('PUT')).toBe(true);
  });

  it('должен возвращать true для PATCH', () => {
    expect(shouldIncludeBody('PATCH')).toBe(true);
  });
});
