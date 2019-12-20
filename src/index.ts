import { LinterError } from './types/LinterError';

export function linter(json: string) {
  if (!json) {
    throw new Error('json parameter is required');
  }

  const errors: LinterError[] = [];

  return errors;
}
