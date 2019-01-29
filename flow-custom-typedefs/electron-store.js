declare module 'electron-store' {
  declare class ElectronStore {
    constructor({
      defaults?: Object,
      name?: string,
      cwd?: string,
      encryptionKey?: string | Buffer,
      fileExtension?: string,
    }): ElectronStore;

    set(key: string, value: string): void;
    set(payload: Object): void;
    get(key: string): string;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    size: number;
    store: Object;
    path: string;
    openInEditor(): void;
  }

  declare export default typeof ElectronStore;
}
