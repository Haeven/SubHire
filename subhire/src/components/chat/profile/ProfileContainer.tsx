import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { useAppDispatch, useAppSelector, useUploadImage } from "@/lib/hooks";
import {
  Modal,
  AppTooltip,
  Button,
  LoadingSpinner,
  ProfilePicture,
} from "@/components";
import { createToast } from "@/toastSlice";
import { editProfile, getUserState } from "../authentication/userSlice";
import { changeSideContent, getSideContent } from "@/lib/redux/reducers/sideContentReducer";
import { CiEdit } from "react-icons/ci";

import ProfileEditForm from "./ProfileEditForm";

interface ProfileContainerProps {}

const ProfileContainer = () => {
  const dispatch = useAppDispatch();

  const imageInputRef = useRef<any>(null);

  const { user: currentUser } = useAppSelector(getUserState);
  const { userProfileData: user } = useAppSelector(getSideContent);

  const isCurrentUser = currentUser.uid === user.uid;

  const backBtnHandler = (content: any) => {
    dispatch(changeSideContent({ content }));
  };

  const { uploadImg, imgURL, isImgPending } = useUploadImage();

  const [showModal, setShowModal] = useState(false);

  const infoButtons = [
    { icon: HiOutlineMail, text: user?.email || "" },
    {
      icon: HiOutlineLocationMarker,
      text: user?.location || "",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    dispatch(createToast(`Copied ${text}.`));
  };

  const handleImageChange = async (e: any) => {
    const imageFile = e.target.files[0];

    const uploadImgArgs = {
      imageFile,
      imageInputRef,
    };

    await uploadImg(uploadImgArgs);

    dispatch(createToast("profile picture changed."));
  };

  useEffect(() => {
    dispatch(editProfile({ photoURL: imgURL }));
  }, [imgURL]);

  return (
    <aside className="flex flex-col items-center p-1 py-4 sm:p-4 h-full">
      <Modal setShowModal={setShowModal}>
        {showModal && (
          <ProfileEditForm currentUserInfo={user} setShowModal={setShowModal} />
        )}
      </Modal>

      {/* <main className="flex-col justify-center gap-4 p-1 py-6 sm:p-6"> */}
        <header className="w-full">
          <Button
            variant="ghost"
            onClick={() => backBtnHandler("chats")}
            className="w-full flex gap-2"
          >
            <AiOutlineArrowLeft className="text-xl" />{" "}
            {isCurrentUser ? "Chats" : "Back"}
          </Button>
        </header>

        <section className="flex flex-col items-center text-center p-4 px-8">
          <div className="group mb-2 relative flex items-center justify-center rounded-[50%] overflow-hidden">
            <ProfilePicture
              photoURL={user?.photoURL || ""}
              isOnline={false}
              size={"x-large"}
            />
            {isImgPending && (
              <LoadingSpinner
                className="w-full h-full bg-black/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                msg={""}
              />
            )}
            {isCurrentUser && (
              <label
                htmlFor="photo-change"
                className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 cursor-pointer invisible group-hover:visible w-full h-full"
              >
                <AiOutlineCamera className="text-3xl" />
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="photo-change"
                  className="invisible hidden"
                />
              </label>
            )}
          </div>
          <h2 className="text text-lg">
            {user?.displayName || ""}
          </h2>
          <p className="text-muted">{user?.bio || ""}</p>
        </section>

        <section className="p-2 flex flex-col gap-4 border-t border-main">
          <div className="flex flex-col gap-1 w-100 ">
            {infoButtons.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <Button
                  variant="outline"
                  className="relative group items-center justify-center"
                  onClick={() => copyToClipboard(obj.text as string)}
                  key={(obj.text as string) + i}
                >
                  <Icon className="text-muted text-2xl" />
                  {obj.text}
                  < AppTooltip tip="Copy to clipboard" position="top" />
                </Button>
              );
            })}

            {isCurrentUser && (
              <Button onClick={() => setShowModal(true)} className="mt-2 text-center">
                <CiEdit style={{color: 'black'}}/>
              </Button>
            )}
          </div>
        </section>
      {/* </main> */}
    </aside>
  );
};

export default ProfileContainer;
