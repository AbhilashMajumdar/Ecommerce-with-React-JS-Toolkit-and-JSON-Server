import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrder />
      </Navbar>
    </>
  );
};

export default UserOrderPage;
