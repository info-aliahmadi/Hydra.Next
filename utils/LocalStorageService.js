'use client';
export default class LocalStorageService {
  localStorageName;
  constructor(localStorageName) {
    this.localStorageName = localStorageName;
  }
  // eslint-disable-next-line no-unused-vars
  AddItem(value, _expireDate) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.localStorageName, JSON.stringify(value));
    }
  }
  getItem() {
    if (typeof window !== 'undefined') {
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
