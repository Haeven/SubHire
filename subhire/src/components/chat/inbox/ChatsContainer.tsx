import { useEffect, useState } from "react";
import { ErrorMsg, LoadingSpinner, AppButton, AppTooltip } from "@/components";
import { inbox_empty } from "@/lib/assets/images";

import ChatList from "./ChatList";
import { GroupChat, User } from "@/lib/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserState } from "../authentication/userSlice";
import { changeChat, getChatState } from "./chatReducer";
import { MdGroupAdd, MdPersonAdd } from "react-icons/md";
import { changeSideContent } from "@/lib/redux/reducers/sideContentReducer";

const ChatsContainer = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const [isPending, setIsPending] = useState<boolean>(false);

  const [chats, setChats] = useState<Object[]>([]);
  const dispatch = useAppDispatch();

  const chatClickHandler = (recipient: User | GroupChat, isGroup: boolean) => {
    dispatch(changeChat({ recipient, isGroup }));
  };

  useEffect(() => {
    if (!currentUser.uid) return;
    setIsPending(true);

    // const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    // const unsub = onSnapshot(userChatsDocRef, async (doc) => {
    //   const chats = Object.entries({ ...doc.data() });
    //   setChats(chats);
    //   setIsPending(false);
    // });

    return () => {
      // unsub();
    };
  }, [currentUser.uid]);
  return (
    <aside className="p-4 flex flex-col gap-2 h-full">
      <header className="flex gap-1 items-center">
        <h1 className="ml-4 text text-2xl">Chats</h1>
        <ul className="ml-auto flex gap-1">
          <li>
            {" "}
            < AppButton
              variant="transparent"
              className="relative group z-10 py-3 px-3"
              onClick={() =>
                dispatch(changeSideContent({ content: "addcontact" }))
              }
            >
              <MdPersonAdd className="text-muted text-2xl" />
              < AppTooltip tip="New Contact" position="bottom" />
            </ AppButton>
          </li>
          <li>
            < AppButton
              variant="transparent"
              className="relative group z-10 py-3 px-3"
              onClick={() =>
                dispatch(changeSideContent({ content: "new-group" }))
              }
            >
              <MdGroupAdd className="text-muted text-2xl" />
              < AppTooltip tip="New Team" position="bottom" />
            </ AppButton>
          </li>
        </ul>
      </header>

      <main className="relative flex flex-col overflow-scroll scrollbar-hide">
        {chats.length !== 0 &&
          chats
            .sort(
              (a: any, b: any) =>
                b[1].lastMessage?.date.toDate() -
                a[1].lastMessage?.date.toDate()
            )
            .map((chat: any, i: number) => (
              <ChatList
                key={chat[0]}
                chat={chat}
                chatClickHandler={chatClickHandler}
              />
            ))}

        {chats.length === 0 && !isPending && (
          <ErrorMsg
            img={inbox_empty}
            msg="Your inbox is empty"
            subMsg="Find a contact in Add Contact section."
          />
        )}

        {isPending && <LoadingSpinner msg="Fetching chats..." />}
      </main>
    </aside>
  );
};

export default ChatsContainer;
