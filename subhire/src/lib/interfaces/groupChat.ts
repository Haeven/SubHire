// import { Timestamp } from "firebase/firestore";

export default interface GroupChat {
  isGroup: true;
  ownerUID: string;
  photoURL: string;
  groupName: string;
  groupAdmins: string[];
  membersID: string[];
  groupID: string;
  dateCreated: string;
  lastMessage: {
    date: string;
    message: string;
  };
}

export interface UserGroupChat {
  groupID: string;
  isGroup: true;
  active: boolean;
  unread: boolean;
  unreadMsgCount: number;
  lastMessage: {
    message: string;
    date: string;
  };
  isGlobal?: boolean;
}
