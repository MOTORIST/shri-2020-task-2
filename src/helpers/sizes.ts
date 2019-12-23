const SIZES = [
  'xxxs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
  'xxxxxl',
];

export function getSize(size: string, step: number = 0): string | undefined {
  return SIZES[SIZES.indexOf(size) + step];
}
