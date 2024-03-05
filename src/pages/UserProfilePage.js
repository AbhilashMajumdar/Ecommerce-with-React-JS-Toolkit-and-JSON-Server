import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar/Navbar";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
    </>
  );
};

export default UserProfilePage;
