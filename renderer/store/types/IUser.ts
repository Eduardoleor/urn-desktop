export type Role = "admin" | "president";

export type UserStore = {
  id: string;
  name: string;
  role: Role;
  urnAssociated: string;
  active: boolean;
};

interface IUser {
  user: Array<UserStore>;
  addUser: (user: UserStore) => void;
  removeAllUsers: () => void;
}

export default IUser;
