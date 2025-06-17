export interface IInfiniteQuery<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T;
}
