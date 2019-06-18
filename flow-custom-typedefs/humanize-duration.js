declare module 'humanize-duration' {
  declare type options = {
    language?: string,
    fallbacks?: string[],
    delimiter?: string,
    spacer?: string,
    largest?: number,
    units?: string[],
    round?: boolean,
    decimal?: string,
    conjunction?: string,
    maxDecimalPoints?: number,
    unitMeasures?: {
      y?: number,
      mo?: number,
      w?: number,
      d?: number,
    },
  };

  declare module.exports: (milli: number, opt?: options) => string;
}
