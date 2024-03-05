import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUserAsync } from "../authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUserAsync());
  }, [dispatch]);

  return <></>;
};

export default Logout;
