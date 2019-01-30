declare module 'lodash.groupby' {
  declare type _ValueOnlyIteratee<T> = (value: T) => mixed;
  declare type ValueOnlyIteratee<T> = _ValueOnlyIteratee<T> | string;

  declare type GroupBy = <V, T>(
    array: $ReadOnlyArray<T>,
    iteratee?: ?ValueOnlyIteratee<T>,
  ) => { [key: V]: Array<T> } & ((array: void | null, iteratee?: ?ValueOnlyIteratee<any>) => {}) &
    (<V, A, T: { [id: any]: A }>(
      object: T,
      iteratee?: ValueOnlyIteratee<A>,
    ) => { [key: V]: Array<A> });

  declare export default GroupBy;
}
