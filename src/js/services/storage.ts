import { defaultStorage } from "../defaults";
import { JTI } from "../../types/types";

const StorageService = {
  key: "JTI",
  read: function (): JTI.Storage {
    let storageString = localStorage.getItem(this.key);
    return storageString ? JSON.parse(storageString) : defaultStorage;
  },
  write: function (state: JTI.Storage) {
    localStorage.setItem(this.key, JSON.stringify(state));
  },
  add: function (id: string) {
    let storage = this.read();
    if (isNewIntro(id)) {
      storage.push(id);
      this.write(storage);
    }
  },
};

export const isNewIntro = (id: string) => {
  return !StorageService.read().includes(id);
};

export default StorageService;
