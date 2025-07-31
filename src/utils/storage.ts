type StorageKey = "auth" | "me";

export default {
  get(key: StorageKey) {
    return localStorage.getItem(key) ?? null;
  },
  set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: StorageKey) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
  
};
