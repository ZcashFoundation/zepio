declare module 'electron-store' {
  declare function callback(string, string): void;

  declare class ElectronStore {
    constructor({
      defaults?: Object,
      name?: string,
      cwd?: string,
      encryptionKey?: string | Buffer,
      fileExtension?: string,
    }): ElectronStore;

    set(key: string, value: any): void;
    set(payload: Object): void;
    get(key: string): any;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    onDidChange(key: string, cb: typeof callback): void;
    size: number;
    store: Object;
    path: string;
    openInEditor(): void;
  }

  declare export default typeof ElectronStore;
}
