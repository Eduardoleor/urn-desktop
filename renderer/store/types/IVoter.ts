export type Voter = {
  id: string;
  voter_key: string;
  user_associated: string;
  voted: boolean;
  start_at?: string;
};

export type VoterStep = "1" | "2" | "3";

interface IVoter {
  voter: Array<Voter>;
  voterStep: Array<VoterStep>;
  addVoter: (voter: Voter) => void;
  addVoterStep: (voter: any) => void;
  removeAllVoters: () => void;
  removeAllVoterSteps: () => void;
}

export default IVoter;
