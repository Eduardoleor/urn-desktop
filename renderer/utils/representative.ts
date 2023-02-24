import { NULL_VOTE, OTHER_VOTE } from "@/constants/representative";
import { Representative } from "@/types/representative";

const addOthersRepresentative = (data: Representative[]) => {
  const nullRepresentative = {
    id: NULL_VOTE,
    name: null,
    owner: null,
    substitute: null,
    image: null,
  };
  const otherRepresentative = {
    id: OTHER_VOTE,
    name: null,
    owner: null,
    substitute: null,
    image: null,
  };
  return [...data, nullRepresentative, otherRepresentative];
};

const cleanNameRepresentative = (str: string) => {
  return str.toLocaleLowerCase().replace(/\s/g, "");
};

export { addOthersRepresentative, cleanNameRepresentative };
