'use client';
import React, { useEffect, useRef, useState } from "react";

import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";
import { Modal, Button } from "@/components";
import useSendMessage from "./useSendMessage";
import { useUploadImage } from "@/lib/hooks";

interface ChatFormProps {
  editingMsgRef: any;
  isEditingMsg: boolean;
  setIsEditingMsg: (state: boolean) => void;
}

const ChatForm = ({
  editingMsgRef,
  isEditingMsg,
  setIsEditingMsg,
}: ChatFormProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const chatInputRef = useRef<HTMLInputElement>(null);

  const { uploadImg, removeUploadImg, imgURL } = useUploadImage();
  const { sendMessage, sendImage, editMsg } = useSendMessage();

  const imageInputRef = useRef<any>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setMessage("");

      if (isEditingMsg) {
        setIsEditingMsg(false);
        editMsg(editingMsgRef.current, message);
      } else {
        sendMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEditingMsg) {
      setMessage(editingMsgRef.current.message);
      chatInputRef.current?.focus();
    } else {
      setMessage("");
    }
  }, [isEditingMsg]);

  const handleImageChange = async (e: any) => {
    setShowModal(true);

    const imageFile = e.target.files[0];

    const uploadImgArgs = {
      imageFile,
      imageInputRef,
    };

    uploadImg(uploadImgArgs);
  };

  const closeImageModal = (deleteStorageImage?: boolean) => {
    try {
      deleteStorageImage && removeUploadImg();

      imageInputRef.current.value = "";
      setShowModal(false);
    } catch (error) {
      throw error;
    }
  };

  const handleSendImage = () => {
    try {
      sendImage(imgURL);
      closeImageModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative w-full flex pr-2 items-center gap-1 bg-main rounded-full duration-300"
    >
      <Modal
        isHidingModal={false}
        className="p-2 px-2"
        setShowModal={setShowModal}
      >
        {showModal && (
          <div className="flex flex-col gap-2">
            <img alt="Chat" src={imgURL} className="w-64 rounded-xl" />
            <div className="flex flex-col gap-1 ">
              <Button
                onClick={handleSendImage}
                className="py-1"
                variant="destructive"
              >
                Send
              </Button>
              <Button
                onClick={() => closeImageModal(true)}
                className="justify-center py-1"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex p-2">
        <label
          htmlFor="image-input"
          className="text-muted-light dark:text-muted-dark/50 p-2 cursor-pointer"
        >
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            id="image-input"
            className="hidden"
            onChange={handleImageChange}
          />
          <RiImageAddLine className="text-2xl" />
        </label>
      </div>

      <input
        required
        ref={chatInputRef}
        type="text"
        value={message}
        placeholder="Message here"
        className="py-2 w-full bg-transparent outline-none text"
        onChange={(e) => setMessage(e.target.value)}
        onBlur={(e) => setMessage(e.target.value)}
      />
      <Button
        type="submit"
        disabled={!message as unknown as boolean}
        className="rounded-full relative ml-auto h-full p-4 px-2 flex items-center justify-center"
      >
        <MdSend className={`text-white text-2xl`} />
      </Button>
    </form>
  );
};

export default ChatForm;
