import { describe, it, expect } from 'vitest';
import { getStatusCodeText } from './getStatusCodeText';

describe('getStatusCodeText', () => {
  it('должен возвращать описание для 400', () => {
    expect(getStatusCodeText(400)).toBe('Неверный запрос');
  });

  it('должен возвращать описание для 401', () => {
    expect(getStatusCodeText(401)).toBe('Не авторизован');
  });

  it('должен возвращать описание для 403', () => {
    expect(getStatusCodeText(403)).toBe('Доступ запрещён');
  });

  it('должен возвращать описание для 404', () => {
    expect(getStatusCodeText(404)).toBe('Не найдено');
  });

  it('должен возвращать описание для 408', () => {
    expect(getStatusCodeText(408)).toBe('Превышено время ожидания');
  });

  it('должен возвращать описание для 429', () => {
    expect(getStatusCodeText(429)).toBe('Слишком много запросов');
  });

  it('должен возвращать описание для 500', () => {
    expect(getStatusCodeText(500)).toBe('Внутренняя ошибка сервера');
  });

  it('должен возвращать описание для 502', () => {
    expect(getStatusCodeText(502)).toBe('Неверный шлюз');
  });

  it('должен возвращать описание для 503', () => {
    expect(getStatusCodeText(503)).toBe('Сервис недоступен');
  });

  it('должен возвращать "Информационный" для 1xx', () => {
    expect(getStatusCodeText(100)).toBe('Информационный');
    expect(getStatusCodeText(199)).toBe('Информационный');
  });

  it('должен возвращать "Перенаправление" для 3xx', () => {
    expect(getStatusCodeText(300)).toBe('Перенаправление');
    expect(getStatusCodeText(399)).toBe('Перенаправление');
  });

  it('должен возвращать "Ошибка {status}" для неизвестного кода', () => {
    expect(getStatusCodeText(999)).toBe('Ошибка 999');
  });

  it('должен возвращать описание для 402', () => {
    expect(getStatusCodeText(402)).toBe('Требуется оплата');
  });

  it('должен возвращать описание для 405', () => {
    expect(getStatusCodeText(405)).toBe('Метод не разрешён');
  });

  it('должен возвращать описание для 409', () => {
    expect(getStatusCodeText(409)).toBe('Конфликт');
  });

  it('должен возвращать описание для 410', () => {
    expect(getStatusCodeText(410)).toBe('Ресурс удалён');
  });

  it('должен возвращать описание для 413', () => {
    expect(getStatusCodeText(413)).toBe('Слишком большой запрос');
  });

  it('должен возвращать описание для 414', () => {
    expect(getStatusCodeText(414)).toBe('Слишком длинный URL');
  });

  it('должен возвращать описание для 415', () => {
    expect(getStatusCodeText(415)).toBe('Неподдерживаемый тип контента');
  });

  it('должен возвращать описание для 501', () => {
    expect(getStatusCodeText(501)).toBe('Метод не поддерживается');
  });

  it('должен возвращать описание для 504', () => {
    expect(getStatusCodeText(504)).toBe('Шлюз не отвечает');
  });
});
