import { Timestamp } from "firebase/firestore";

export interface userProps{
  uid: string;
  userName: string;
  email: string;
  role: string;
  photoUrl: string
  criadoEm: Timestamp
}