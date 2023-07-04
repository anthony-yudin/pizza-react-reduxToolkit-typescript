export interface TSort {
  order?: 'asc' | 'desc'
  sortBy?: string
}

export type TSortAll = {
  title?: string
  data?: TSort
};

export interface TFilterInitialState extends TSort {
  title?: string | 'none'
  category?: number | null
}
