export const replaceParam = (url: string, paramName: string, paramValue: string) =>
  url.replace(`:${paramName}`, paramValue);
