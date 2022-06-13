import { _isDefined } from "./type-utils";

export class URLUtils {

  /**
   * @description Find the value of a query parater in an url
   * @param url [[string]] url value
   * @param needle [[string]] search
   */
  public static findInQueryString(url: string, needle: string): string {
    const a = new URL(url);
    const arr = a.search.split('&');
    const match = arr.filter(item => {
      return item.lastIndexOf(needle) !== -1;
    });
    if (match.length > 0) {
      return match[0].replace(needle, '').replace('#', '');
    }
    return null;
  }

  /**
   * @description Checks if the url passed as parameter start with http|https|ftp
   * @param url [[string]]
   */
  public static isWebURL(url: string) {
    const pattern = /^((http|https|ftp):\/\/)/;
    return pattern.test(url);
  }
}

/**
 * 
 * @param url Url from which to generate the base path from
 */
 export const httpServerHost = (url: string) => {
  if (!_isDefined(url)) {
      return '';
  }
  const jsUrl = new URL(url);
  url = `${jsUrl.protocol}//${jsUrl.host}`;
  return `${(`${url.endsWith('/') ? url.slice(0, -1) : url}`)}`;
}
