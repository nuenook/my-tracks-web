
  
import React, { useEffect, useState, ReactNode } from "react";
import firebaseApp from "../firebase"

export const AuthContext = React.createContext("");

interface IAuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
        console.log("user: ", user)

        if(user) {
            console.log("user.email: ", user.email)
            
            setCurrentUser(user.email ? user.email : "")
        }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={
        currentUser
      }
    >
      {children}
    </AuthContext.Provider>
  );
};