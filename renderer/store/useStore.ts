import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import createUserSlice from "./slices/userSlice";
import IUser from "./types/IUser";

type Store = IUser;
const useStore = create<Store>()((...a) => ({
  ...createUserSlice(...a),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}

export default useStore;
