type StorageType = 'localStorage' | 'sessionStorage';

interface StorageOperations {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

export class BrowserStorage implements StorageOperations {
  private storage: Storage;

  constructor(type: StorageType = 'localStorage') {
    if (typeof window !== 'undefined') {
      this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
    } else {
      throw new Error('Browser storage is not available on the server side');
    }
  }

  getItem(key: string) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  setItem(key: string, value: any) {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  }

  removeItem(key: string) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  }

  clear() {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const setCookie = (name: string, value: string, days: number = 7) => {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  } catch (error) {
    console.error(`Error setting cookie ${name}:`, error);
  }
};

export const getCookie = (name: string): string | null => {
  try {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

export const removeCookie = (name: string) => {
  setCookie(name, '', -1);
};