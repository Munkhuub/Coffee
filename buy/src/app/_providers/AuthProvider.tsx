"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "react";
import { api, setAuthToken } from "@/axios";

export type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaUrl: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
export type BankCard = {
  id: number;
  country: string;
  firstname: string;
  lastname: string;
  cardNumber: string;
  expiryDate: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
export type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  profile?: Profile;
  bankCard?: BankCard;
  donations: Donation[];
  createdAt: string;
  updatedAt: string;
};

type getMeTypes = {
  token: string;
  user: User;
};

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post<getMeTypes>("/auth/signin", {
        email,
        password,
      });
      console.log("SignIn response data:", data);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      setAuthToken(data.token);
      toast.success("Logged in successfully!");
      router.push("/createProfile");
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("Failed to sign in");
    }
  };

  const signUp = async ({
    username,
    email,
    password,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    console.log("hi11");

    try {
      const { data } = await api.post<getMeTypes>("/auth/signup", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      setAuthToken(data.token);

      router.push("/createProfile");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to sign up");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setAuthToken("");
    router.push("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setAuthToken(token);

    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<User>("/auth/getMe");
        setUser(data);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        setUser(undefined);
        setAuthToken("");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, loading, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
