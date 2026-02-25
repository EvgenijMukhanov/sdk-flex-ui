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

## Объявление типов

Где нет выгоды от использования интерфейсов (например, не требуется declaration merging), всегда использовать типы (`type`).

**Предпочтительно:**

```typescript
type ConfigurationRouting = {
  name: string;
  route: string;
};

type Routing = {
  routing: ConfigurationRouting[];
};
```

**Непредпочтительно:**

```typescript
interface ConfigurationRouting {
  name: string;
  route: string;
}

interface Routing {
  routing: ConfigurationRouting[];
}
```

## Порядок импортов

Импорты должны быть размещены в следующем порядке:

1. **Импорты библиотек** (сторонние пакеты)
2. **Импорты компонентов**
3. **Импорты методов** (утилиты, хелперы)
4. **Импорты типов и интерфейсов**
5. **Импорты стилей** (в т.ч. CSS-модули)
6. **Остальное**

Между каждой группой импортов должна быть пустая строка.

**Предпочтительно:**

```typescript
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { FlexCard } from '../../widgets/FlexCard';
import { Header } from '../../components/Header';

import { formatDate } from '../../utils/formatDate';
import { validateData } from '../../helpers/validateData';

import type { User } from '../../types/User';
import type { ApiResponse } from '../../api/types';

import styles from './Component.module.css';
import './additional.css';

import { SOME_CONSTANT } from '../../constants';
```

**Непредпочтительно:**

```typescript
import styles from './Component.module.css';
import { useState } from 'react';
import type { User } from '../../types/User';
import { FlexCard } from '../../widgets/FlexCard';
import { formatDate } from '../../utils/formatDate';
import { SOME_CONSTANT } from '../../constants';
import { BrowserRouter } from 'react-router-dom';
```
