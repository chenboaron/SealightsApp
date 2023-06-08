import { Address } from "./address.model";

export interface User {
    id: number;
    name: string;
    birthdate: string;
    addresses: Address[];
  }