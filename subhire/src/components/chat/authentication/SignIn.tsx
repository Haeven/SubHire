'use client';
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { InputForm, Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { makePendingMsg } from "@/toastSlice";
import {
  clearUserStateErr,
  getUserState,
  googleLogin,
  emailLogin,
} from "./userSlice";
import { Input } from "@/components/input/Input";

interface SignInProps {
  setIsSigningIn: (state: boolean) => void;
  setKeepSignedIn: (state: boolean) => void;
  keepSignedIn: Boolean;
}

const SignIn = ({
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
}: SignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { status, errorMsg } = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(emailLogin({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    dispatch(clearUserStateErr());
  }, [email, password]);

  useEffect(() => {
    status === "pending" && dispatch(makePendingMsg("Signing in..."));

    return () => {
      dispatch(makePendingMsg(""));
    };
  }, [status]);

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text text-3xl font-semibold text-center">
          SubHire
        </label>
        <label className="text-muted text-sm text-center mb-4">
          Enter your credentials
        </label>
      </div>

      <p
        className={`text-red-600 text-md text-center ${
          errorMsg ? "visible block" : "absolute invisible"
        }`}
      >
        {errorMsg}
      </p>

      <Input
        autoFocus={true}
        type="email"
        value={email}
        onChange={({target: {value}}) => setEmail(value)}
        placeholder="e.g example123@example.com"
      />
      <Input
        type="password"
        value={password}
        onChange={({target: {value}}) => setPassword(value)}
        placeholder="*********"
      />

      {/* Keep me signed in button is not working yet */}
      {/* <Button
        onClick={() => setKeepSignedIn(!keepSignedIn)}
        variant="ghost"
        type="button"
        className="flex flex-wrap gap-2 items-center "
      >
        <div
          className={`p-0.5 border-2 text-sm rounded-md bg-transparent duration-300 ${
            keepSignedIn
              ? `bg-primary-main text-white border-primary-main `
              : " text-transparent border-muted-light dark:border-muted-dark"
          }`}
        >
          <AiOutlineCheck />
        </div>
        Keep me signed in
      </Button> */}

      <Button
        type="submit"
        className="mt-4"
        disabled={!email || !password || (status === "pending" && true)}
      >
        {status === "pending" ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-muted text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setIsSigningIn(false)}
          className="text-primary-main hover:text-primary-tinted dark:text-primary-tinted dark:hover:text-primary-main font-semibold cursor-pointer duration-300"
        >
          Sign up
        </button>
      </p>

      <div className="flex flex-col gap-2 mt-4">
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={status === "pending" && true}
          className="justify-center text-primary-tinted dark:text-primary-shaded"
          variant="ghost"
        >
          Sign In With Google
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
