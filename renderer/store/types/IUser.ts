export type Role = "admin" | "president";

export type User = {
  id: string;
  name: string;
  role: Role;
  urnAssociated: string;
  active: boolean;
};

interface IUser {
  user: Array<User>;
  addUser: (user: User) => void;
  removeAllUsers: () => void;
}

export default IUser;
