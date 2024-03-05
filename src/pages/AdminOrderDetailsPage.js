import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrderDetails from "../features/admin/AdminOrderDetails";

const AdminOrderDetailsPage = () => {
  return (
    <>
      <Navbar>
        <AdminOrderDetails />
      </Navbar>
    </>
  );
};

export default AdminOrderDetailsPage;
