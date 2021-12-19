import { SortOrder } from './sort-order.enum';

export interface SortOrderField {
  name: string;
  title: string;
}

export function getSortOrderFields(): SortOrderField[] {
  return [
    {
      name: SortOrder.Ascending,
      title: 'Ascending'
    },
    {
      name: SortOrder.Descending,
      title: 'Descending'
    }
  ];
}
