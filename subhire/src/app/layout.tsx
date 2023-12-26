import { lazy, StrictMode, Suspense, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector, useLocalStorage } from "@/lib/hooks";
import dynamic from 'next/dynamic'
// import { useAuthState } from "react-firebase-hooks/auth";
// import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getPendingMsg, getToastMsg } from "@/toastSlice";
import type { Metadata } from 'next'  
import { Inter } from 'next/font/google'
import './globals.css'
import { LoadingSpinner, Toast } from "@/components";
import { Providers } from '@/lib/redux/provider';
import { getUserState } from "@/components/chat/authentication/userSlice";
const inter = Inter({ subsets: ['latin'] })
import {
  enableDarkmode,
  getThemeState,
  toggleDarkmode,
} from "@/components/chat/sidebar/themeSlice";

export const metadata: Metadata = {
  title: 'SubHire',
  description: 'Hire verified subcontractors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user: currentUser } = useAppSelector(getUserState);

  // const pendingMsg = useAppSelector(getPendingMsg);
  // const toastMsg = useAppSelector(getToastMsg);
  // const { darkmode } = useAppSelector(getThemeState);
  const FallBack = <div className="h-screen w-screen flex justify-center items-center">
    <LoadingSpinner msg="Loading..." />
  </div>
  return (
    // <Providers>
      <html lang="en">
        <body className={inter.className}>
          <StrictMode>
            {/* <AnimatePresence> */}
              {/* Loading Toast */}
              {/* {pendingMsg && <Toast type="loading" msg={pendingMsg} />} */}

              {/* Notification Toast */}
              {/* {toastMsg && <Toast durationMS={3000} msg={toastMsg} />} */}
            {/* </AnimatePresence> */}

            <Suspense fallback={FallBack}>
              {/* {currentUser.uid ? ( */}
                {/* <motion.div
                  className="flex"
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                > */}
                <Providers>
                  {children}
                </Providers>
                {/* </motion.div> */}
              {/* ) : (
                <Authentication
                  keepSignedIn={keepSignedIn}
                  setKeepSignedIn={setKeepSignedIn}
                />
              )} */}
            </Suspense>
          </StrictMode>
          <div id="root"></div>
          <div id="toast"></div>
          <div id="modal"></div>
        </body>
      </html>
    // </Providers>
  )
}
