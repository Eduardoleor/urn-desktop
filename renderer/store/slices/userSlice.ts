import { StateCreator } from "zustand";
import IUser, { UserStore } from "../types/IUser";

const createUserSlice: StateCreator<IUser> = (set, get) => ({
  user: [],
  addUser(user: UserStore) {
    set((_) => ({ user: [user] }));
  },
  removeAllUsers() {
    set((_) => ({ user: [] }));
  },
});

export default createUserSlice;
