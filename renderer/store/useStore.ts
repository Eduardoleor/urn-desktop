import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import createUserSlice from "./slices/userSlice";
import createVoterSlice from "./slices/voterSlice";

import IUser from "./types/IUser";
import IVoter from "./types/IVoter";

type Store = IUser & IVoter;
const useStore = create<Store>()((...a) => ({
  ...createUserSlice(...a),
  ...createVoterSlice(...a),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}

export default useStore;
