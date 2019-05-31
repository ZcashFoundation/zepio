declare module 'find-process' {
  declare type searchType = 'pid' | 'port' | 'name';
  declare type searchValue = string | number;
  declare type process = {
    pid: number,
    ppid: number,
    uid: string,
    gid: string,
    name: string,
    bin: string,
    cmd: string,
  };

  declare module.exports: (type: searchType, value: searchValue) => Array<process>;
}
