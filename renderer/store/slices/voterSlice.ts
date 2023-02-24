import { StateCreator } from "zustand";
import IVoter, { Voter } from "../types/IVoter";

const createVoterSlice: StateCreator<IVoter> = (set, get) => ({
  voter: [],
  voterStep: [],
  addVoter(voter: Voter) {
    set((_) => ({ voter: [voter] }));
  },
  removeAllVoters() {
    set((_) => ({ voter: [] }));
  },
  addVoterStep(voter: any) {
    const voterSteps = [...get().voterStep];
    set((_) => ({ voterStep: [...voterSteps, voter] }));
  },
  removeAllVoterSteps() {
    set((_) => ({ voterStep: [] }));
  },
});

export default createVoterSlice;
