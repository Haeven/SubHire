export default interface User {
  groupName?: string;
  isUser: true;
  isGroup: false;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  location: string;
  status: string;
  contacts: string[];
}
