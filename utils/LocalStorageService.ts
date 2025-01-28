export default class LocalStorageService {
  localStorageName;
  constructor(localStorageName : string) {
    this.localStorageName = localStorageName;
  }

  addItem(value: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageName, JSON.stringify(value));
    }
  }
  getItem() : string | undefined {
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
        return undefined;
      }
    }
  }
  deleteItem() {
    localStorage.removeItem(this.localStorageName);
  }
}
