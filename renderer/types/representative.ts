export type Representative = {
  id: string;
  name: string;
  owner: string;
  substitute: string;
  image: string;
};

export type RegisterVote = {
  userId: string;
  voterId: string;
  representativeId: string;
  representativeType: string;
};
