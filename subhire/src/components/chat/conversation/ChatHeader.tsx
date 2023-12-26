import { AiOutlineArrowLeft } from "react-icons/ai";

import { ProfilePicture, AppButton } from "@/components";
import { User } from "@/lib/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getChatState, resetChat } from "../inbox/chatReducer";
import { useGetUserStatus } from "@/lib/hooks";
import { showUserProfile } from "@/lib/redux/reducers/sideContentReducer";

interface ChatHeaderProps {
  recipient: User;
}

const ChatHeader = ({ recipient }: ChatHeaderProps) => {
  const { isGroup } = useAppSelector(getChatState);
  const online = useGetUserStatus(recipient?.uid);

  const dispatch = useAppDispatch();

  const profileClickHandler = () => {
    // 768px screen width below have the mobile layout
    if (screen.width <= 768) {
      dispatch(resetChat());
    }

    dispatch(showUserProfile({ userProfileData: recipient }));
  };

  const handleBackBtn = () => {
    dispatch(resetChat());
  };

  return (
    <header className="border-b border-main w-full p-4  mb-auto bg-main duration-300 flex gap-2">
      < AppButton
        variant="transparent"
        onClick={handleBackBtn}
        className="md:hidden px-4"
      >
        <AiOutlineArrowLeft className="text-xl" />
      </ AppButton>
      <div className="flex items-center gap-4">
        <button disabled={isGroup ? true : false} onClick={profileClickHandler}>
          <ProfilePicture
            isOnline={online}
            photoURL={recipient?.photoURL}
            size="small"
          />
        </button>
        <div className="flex flex-col gap-0">
          <h2 className="text text-xl">
            {recipient.displayName || recipient.groupName}
          </h2>
          {/* Disabled for now */}
          {/* {!isGroup && (
            <p className="text-muted text-sm">
              {online ? "online" : "offline"}
            </p>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
