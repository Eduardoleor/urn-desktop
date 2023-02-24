import { StateCreator } from "zustand";
import IVoter, { Voter } from "../types/IVoter";

const createVoterSlice: StateCreator<IVoter> = (set, get) => ({
  voter: [],
  addVoter(voter: Voter) {
    set((_) => ({ voter: [voter] }));
  },
  removeAllVoters() {
    set((_) => ({ voter: [] }));
  },
});

export default createVoterSlice;
