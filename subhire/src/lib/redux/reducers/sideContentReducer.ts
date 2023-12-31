import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/interfaces";

type InitialStateType = {
  content: string;
  userProfileData: User | null;
};

const initialState: InitialStateType = {
  content: "chats",
  userProfileData: null,
};

type changeSideTypes = {
  content: "chats" | "addcontact" | "settings" | "new-group";
};
type showUserProfileType = { userProfileData: User };

const sideContentSlice = createSlice({
  name: "sideContent",
  initialState,
  reducers: {
    changeSideContent: (state, action: PayloadAction<changeSideTypes>) => {
      state.content = action.payload.content;
    },
    showUserProfile: (state, action: PayloadAction<showUserProfileType>) => {
      state.content = "settings";
      state.userProfileData = action.payload.userProfileData;
    },
  },
});

export const getSideContent = (state: any) => state.sideContent;

export const { changeSideContent, showUserProfile } = sideContentSlice.actions;

export default sideContentSlice.reducer;
