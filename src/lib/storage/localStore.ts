const save = (key: string, value: string) => localStorage.setItem(key, value);
const remove = (key: string) => localStorage.removeItem(key);
const retrieve = (key: string) => localStorage.getItem(key);

const localStore = {
  save,
  remove,
  retrieve,
};

export default localStore;
