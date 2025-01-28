export default class CookieService {
  cookieName;
  constructor(cookieName : string) {
    this.cookieName = cookieName;
  }
  addItem(value: string, expireDate: string) {
    let expire;
    if (!expireDate) {
      const d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      expire = d.toUTCString();
    } else {
      expire = expireDate;
    }

    document.cookie = this.cookieName + '=' + value;
    document.cookie = 'expires=' + expire;
    document.cookie = 'path=/';
  }
  getItem() : string | undefined {
    let value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(this.cookieName + '='))
      ?.split('=')[1];
    return value;
  }
  deleteItem() {
    document.cookie = this.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
