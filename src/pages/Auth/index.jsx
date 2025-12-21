import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Nopage from "@/components/misc/Nopage";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  );
};

export default Auth;
