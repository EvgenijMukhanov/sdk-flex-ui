import type { Routing } from '../routing';
import type { ConfigurationRouting } from '../types/routing';

type ValidationResult = {
  success: boolean;
  data: Routing | undefined;
  errors: unknown | undefined;
};

export const validateConfigurationRouting = (
  data: unknown
): ValidationResult => {
  if (!_hasValidRoutingProperty(data)) {
    return { success: false, data: undefined, errors: undefined };
  }

  const { routing } = data;

  const validItems: ConfigurationRouting[] = [];
  const invalidItems: unknown[] = [];
  const seenNames = new Set<string>();
  const seenRoutes = new Set<string>();

  for (const item of routing) {
    const { valid, invalid } = _validateRoutingItem(
      item,
      seenNames,
      seenRoutes
    );

    if (valid) {
      validItems.push(valid);
    } else {
      invalidItems.push(invalid);
    }
  }

  const hasErrors = invalidItems.length > 0;

  return {
    success: !hasErrors,
    data: validItems.length > 0 ? { routing: validItems } : undefined,
    errors: hasErrors ? { routing: invalidItems } : undefined,
  };
};

const _isConfigurationRouting = (
  value: unknown
): value is ConfigurationRouting =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  'route' in value &&
  typeof (value as { name: string; route: string }).name === 'string' &&
  typeof (value as { name: string; route: string }).route === 'string';

const _hasValidRoutingProperty = (
  data: unknown
): data is { routing: unknown[] } =>
  typeof data === 'object' &&
  data !== null &&
  'routing' in data &&
  Array.isArray((data as { routing: unknown }).routing);

const _validateRoutingItem = (
  item: unknown,
  seenNames: Set<string>,
  seenRoutes: Set<string>
): { valid: ConfigurationRouting | null; invalid: unknown | null } => {
  if (!_isConfigurationRouting(item)) {
    return { valid: null, invalid: item };
  }

  if (seenNames.has(item.name) || seenRoutes.has(item.route)) {
    return { valid: null, invalid: item };
  }

  seenNames.add(item.name);
  seenRoutes.add(item.route);

  return { valid: item, invalid: null };
};
