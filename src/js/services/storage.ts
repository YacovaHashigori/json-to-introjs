import { defaultStorage } from "../defaults";
import { JTI } from "../../types/types";

export enum StorageServiceCheck {
  New
}

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
    if (this.check(id, StorageServiceCheck.New)) {
      storage.push(id);
      this.write(storage);
    }
  },
  check: function (id: string, action: StorageServiceCheck): boolean {
    switch (action) {
      case StorageServiceCheck.New:
        return !this.read().includes(id);
      default:
        return false;
    }
  }
};

export default StorageService;
