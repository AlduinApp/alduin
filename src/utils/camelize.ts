import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';

export default function camelize<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((value) => camelize(value)) as T;
  } else if (typeof obj === 'object' && obj !== null) {
    return mapKeys(obj, (value, key) => camelCase(key)) as T;
  }

  return obj as T;
}
