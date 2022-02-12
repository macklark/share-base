import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { client } from "./client";
import { Session } from "@supabase/supabase-js";

type authContextType = { isUserAuthenticated: string };

const authContextDefault: authContextType = {
  isUserAuthenticated: "",
};

const AuthContext = createContext<authContextType>(authContextDefault);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<string>("not-authenticated");
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = client.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setIsUserAuthenticated("authenticated");
          router.push("/");
        }
        if (event === "SIGNED_OUT") {
          setIsUserAuthenticated("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function handleAuthChange(event: string, session: Session | null) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ event, session }),
    });
  }

  async function checkUser() {
    const user = await client.auth.user();
    if (user) {
      setIsUserAuthenticated("authenticated");
    }
  }

  const value = {
    isUserAuthenticated,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
