import dynamic from "next/dynamic";
import React from "react";
// import Login from "../components/login"; 

const Login = dynamic(() => import("../components/login"), {
  ssr: false,
});

function login() {
  return <Login />;
}

export default login;
