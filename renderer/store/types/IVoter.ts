export type Voter = {
  id: string;
  voter_key: string;
  user_associated: string;
  voted: boolean;
  start_at?: string;
};

interface IVoter {
  voter: Array<Voter>;
  addVoter: (voter: Voter) => void;
  removeAllVoters: () => void;
}

export default IVoter;
