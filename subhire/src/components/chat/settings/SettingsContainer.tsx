import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components";
import { logout } from "../authentication";
import { toggleDarkmode } from "../sidebar";
import { getThemeState } from "../sidebar/themeSlice";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import { HiOutlineMoon } from "react-icons/hi";
import { resetChat } from "../inbox/chatReducer";
import { changeSideContent } from "@/lib/redux/reducers/sideContentReducer";

interface SettingsContainerProps {}

const SettingsContainer = () => {
  const dispatch = useAppDispatch();
  const { darkmode } = useAppSelector(getThemeState);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetChat());
  };

  const backBtnHandler = (content: any) => {
    dispatch(changeSideContent({ content }));
  };

  return (
    <aside className="flex-col justify-center gap-4 p-1 py-6 sm:p-6">
      <header className="border-b  border-main pb-4">
        <Button
          variant="ghost"
          onClick={() => backBtnHandler("chats")}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Settings
        </Button>
      </header>

      <main className="p-2 flex flex-col gap-1">
        <Button
          variant="ghost"
          className="relative group w-full"
          onClick={() => dispatch(() => ({type:'toggleDarkmode', payload: false}))}
        >
          <HiOutlineMoon className="text-muted text-2xl" />
          Darkmode
          <p className="text-muted ml-auto">{darkmode ? "on" : "off"}</p>
        </Button>
        <Button
          variant="ghost"
          className="relative group w-full"
          onClick={handleLogout}
        >
          <AiOutlineLogout className="text-muted text-2xl" />
          Logout
        </Button>
      </main>
    </aside>
  );
};

export default SettingsContainer;
