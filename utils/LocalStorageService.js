export default class LocalStorageService {
  localStorageName;
  constructor(localStorageName) {
    this.localStorageName = localStorageName;
  }

  addItem(value, _expireDate) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageName, JSON.stringify(value));
    }
  }
  getItem() {
    if (typeof localStorage !== 'undefined') {
      let value = localStorage.getItem(this.localStorageName);
      if (value) {
        try {
          JSON.parse(value);
        } catch (e) {
          return value;
        }
        return JSON.parse(value);
      } else {
        return null;
      }
    }
  }
  deleteItem() {
    localStorage.removeItem(this.localStorageName);
  }
}
