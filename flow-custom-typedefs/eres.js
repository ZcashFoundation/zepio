declare module 'eres' {
  declare module.exports: <T>(Promise<T>) => Promise<[?Error, T]>;
}
