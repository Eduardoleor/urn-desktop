import { StateCreator } from "zustand";
import IUser, { User } from "../types/IUser";

const createUserSlice: StateCreator<IUser> = (set, get) => ({
  user: [],
  addUser(user: User) {
    set((_) => ({ user: [user] }));
  },
  removeAllUsers() {
    set((_) => ({ user: [] }));
  },
});

export default createUserSlice;
