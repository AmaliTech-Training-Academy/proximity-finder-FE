export function filterItemsByQuery(items: string[], query: string): string[] {
    return items.filter(item => item.toLowerCase().startsWith(query.toLowerCase()));
  }
  