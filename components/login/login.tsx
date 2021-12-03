import React from "react";
import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useAuth } from "../../context/authContext";

export const Login = () => {
  const { user, setUser }: any = useAuth();

  const googleProvider = new GoogleAuthProvider();

  function handleClick() {
    if (user.uid) {
      console.log("Already Logged In");
    } else {
      signInWithPopup(auth, googleProvider)
        .then(({ user }) => {
          console.log(user);
          const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
          };
          localStorage.setItem("auth", JSON.stringify(userData));
          setUser(userData);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }

  return (
    <div>
      <Button onClick={handleClick}>Login</Button>
    </div>
  );
};
