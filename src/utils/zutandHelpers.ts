import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

import { immer } from "zustand/middleware/immer";

interface IStore<T> {
  initialState: T;
  name: string;
  PersistOptions?: Omit<PersistOptions<T>, "name" | "storage">;
}

export const createPersistZustandSlice = <T>({
  initialState,
  name,
  PersistOptions,
}: IStore<T>) =>
  create<T>()(
    persist(
      immer(() => initialState),
      {
        name, // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        ...PersistOptions,
      }
    )
  );

export const createZustandSlice = <T>(initialState: T) =>
  create<T>()(immer(() => initialState));
