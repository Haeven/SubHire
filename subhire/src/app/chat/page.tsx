'use client';
import { Sidebar, SideContent } from "@/components/features/sidebar";
import { ChatBox } from "@/components/features/conversation";
import { ErrorMsg } from "@/components";
import { start_messaging_img } from "@/lib/assets/images";
import { useAppSelector } from "@/lib/hooks";
import { getChatState } from "@/components/features/inbox/chatReducer";
import { AnimatePresence, motion } from "framer-motion";
import { VARIANTS_MANAGER } from "@/lib/redux/setup/variants-manager";

const Chat = () => {
  const { chatId, recipient } = useAppSelector(getChatState);

  return (
    <div className="absolute inset-0 flex flex-col-reverse md:flex-row w-screen overflow-hidden">
      <Sidebar />

      <SideContent />

      <AnimatePresence>
        {chatId ? (
          <motion.div
            key="chatbox"
            variants={VARIANTS_MANAGER}
            initial="slide-from-right"
            animate="slide-in"
            exit="slide-from-right"
            className="h-full w-screen absolute z-10 md:relative md:flex items-center justify-center"
          >
            <ChatBox recipient={recipient} />
          </motion.div>
        ) : (
          <ErrorMsg
            className="hidden md:flex"
            img={start_messaging_img}
            msg="Keep Up Accountability with SubHire"
            subMsg="Select a chat in your inbox to start messaging."
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
