import dynamic from "next/dynamic";
import React from "react";

const Login = dynamic(() => import("../components/Login"), {
  ssr: false,
});

function login() {
  return <Login />;
}

export default login;
