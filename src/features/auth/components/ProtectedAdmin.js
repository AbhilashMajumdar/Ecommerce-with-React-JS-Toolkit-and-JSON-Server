import React from "react";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  } else if (user && user.role !== "admin") {
    return <Navigate to={"/"} replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedAdmin;
