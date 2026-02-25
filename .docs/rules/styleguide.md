# Style Guide

## Объявление функций

Где нет выгоды от объявления методов через `function`, всегда использовать стрелочные функции.

**Предпочтительно:**

```typescript
const validateRouting = (data: unknown): ValidationResult => {
  // ...
};
```

**Непредпочтительно:**

```typescript
function validateRouting(data: unknown): ValidationResult {
  // ...
}
```

## Порядок методов в файле

В файле, где есть методы, публичные методы всегда идут перед непубличными.

**Пример:**

```typescript
// Публичный метод
export const validateConfigurationRouting = (
  data: unknown
): ValidationResult => {
  // ...
};

// Непубличные методы
const _isConfigurationRouting = (
  value: unknown
): value is ConfigurationRouting => {
  // ...
};

const _hasValidRoutingProperty = (
  data: unknown
): data is { routing: unknown[] } => {
  // ...
};
```

## Именование непубличных методов

Непубличные методы (private/internal) всегда начинаются с префикса `_`.

**Пример:**

```typescript
// Публичный метод
export const validateConfigurationRouting = (
  data: unknown
): ValidationResult => {
  return _validateRoutingItem(data);
};

// Непубличный метод
const _validateRoutingItem = (item: unknown): ValidationResult => {
  // ...
};
```
