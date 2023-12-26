import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/components/chat/authentication";
import chatReducer from "@/components/chat/inbox/chatReducer";
import { themeReducer } from "@/components/chat/sidebar";
import { sideContentReducer } from "@/lib/redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import toastReducer from "@/toastSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "chat", "toast", "sideContent"],
};

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  chat: chatReducer,
  toast: toastReducer,
  sideContent: sideContentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
