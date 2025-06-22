export type TagVariant = 'primary' | 'outline' | 'subtle';

export function getTagClasses(variant: TagVariant = 'primary') {
  switch (variant) {
    case 'outline':
      return `
        border border-light-accent text-light-accent bg-transparent
        dark:border-dark-accent dark:text-dark-accent
        hover:bg-light-accent hover:text-white
        dark:hover:bg-dark-accent dark:hover:text-dark-bg
      `;
    case 'subtle':
      return `
        bg-light-soft text-light-text border border-light-border
        dark:bg-dark-bg dark:text-dark-subtle dark:border-dark-accent
      `;
    case 'primary':
    default:
      return `
        bg-light-accent text-white
        dark:bg-dark-accent dark:text-dark-bg
        hover:opacity-90
      `;
  }
}
