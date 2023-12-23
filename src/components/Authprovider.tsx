import { createContext, useState, ReactNode } from "react";
import { fakeAuthProvider, User } from "../auth";
import { useContext } from "react";

interface AuthContextType {
  user: any;
  signIn: (user: User) => Promise<any>;
  signOut: () => Promise<void>;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}

let AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<User | null>(null);
  let [roles, setRoles] = useState<string[] | null>(null);

  let signIn = async (user_: User) => {
    return fakeAuthProvider.signIn(user_).then((user) => {
      setUser(user);
      setRoles(user.roles||null);
      return user;
    });
  };

  let signOut = () => {
    return fakeAuthProvider.signOut().then(() => setUser(null));
  };
 
  function isLoggedIn() {
    return user != null;
  }

  function isLoggedInAs(role: string[]) {
    return user?.roles?.some((r) => role.includes(r))||false;
  }

  let value = { user, isLoggedIn, isLoggedInAs, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
