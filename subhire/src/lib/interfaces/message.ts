// import { string } from "firebase/firestore";

export default interface Message {
  id: string;
  senderId: string;
  message: string;
  date: string;
  img: string;
  lastEdited: string | null;
  isEdited: boolean;
}
