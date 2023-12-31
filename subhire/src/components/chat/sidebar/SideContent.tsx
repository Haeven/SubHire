'use client';
import { AnimatePresence, motion } from "framer-motion";
import { ChatsContainer } from "../inbox";
import { VARIANTS_MANAGER } from "@/lib/redux/setup/variants-manager";
import SettingsContainer from "../settings/SettingsContainer";
import { useAppSelector } from "@/lib/hooks";
import { getSideContent } from "@/lib/redux/reducers/sideContentReducer";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components";
import dynamic from "next/dynamic";

const AddContacts = dynamic(() => import("../add-contacts/AddContacts"));

const NewGroupContainer = dynamic(
  () => import("../new-group/NewGroupContainer")
);
const ProfileContainer = dynamic(
  () => import("../profile/ProfileContainer")
);

interface SideContentProps {}

const SideContent = () => {
  const { content: sidebarContent } = useAppSelector(getSideContent);

  const SuspenseFallBack = (
    <div className="h-full w-full flex justify-center items-center">
      <LoadingSpinner msg="Loading..." />
    </div>
  );

  return (
    <aside className="relative border-r border-main w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
      <Suspense fallback={SuspenseFallBack}>
        <AnimatePresence>
          {sidebarContent === "chats" && (
            <motion.div
              key="chats"
              className="absolute w-full h-full overflow-hidden"
              variants={VARIANTS_MANAGER}
              exit="slide-from-right"
              >
              <ChatsContainer />
            </motion.div>
          )}
          {sidebarContent === "addcontact" && (
            <motion.div
            key="add-contacts"
            className="absolute w-full h-full overflow-hidden"
            variants={VARIANTS_MANAGER}
            exit="slide-from-right"
            >
              <AddContacts />
            </motion.div>
          )}
          {sidebarContent === "settings" && (
            <motion.div
              key="settings"
              className="absolute w-full h-full"
              variants={VARIANTS_MANAGER}
              exit="slide-from-right"
              >
              <ProfileContainer />
            </motion.div>
          )}
          {/* {sidebarContent === "settings" && (
            <motion.div
              key="add-contacts"
              className="absolute w-full h-full"
              variants={VARIANTS_MANAGER}
              initial="slide-from-left"
              animate="slide-in"
              exit="slide-from-right"
            >
              <SettingsContainer />
            </motion.div>
          )} */}
          {sidebarContent === "new-group" && (
            <motion.div
              key="new-group"
              className="absolute w-full h-full overflow-y-scroll scrollbar-hide"
              variants={VARIANTS_MANAGER}
              exit="slide-from-right"
            >
              <NewGroupContainer />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </aside>
  );
};
export default SideContent;
