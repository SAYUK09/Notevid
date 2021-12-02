import React from "react";
import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export const Login = () => {
  const googleProvider = new GoogleAuthProvider();

  function handleClick() {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  return (
    <div>
      <Button onClick={handleClick}>LAla</Button>
    </div>
  );
};
