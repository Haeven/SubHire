// import { doc, getDoc } from "firebase/firestore";
import { User } from "@/lib/interfaces";

const useGetUser = () => {
  const getUserInfo = async (userId: string) => {
    // const recipientDocRef = doc(db, "users", userId);
    // const recipientData = (await getDoc(recipientDocRef)).data();

    // return recipientData as unknown as User;
  };

  return getUserInfo;
};

export default useGetUser;
