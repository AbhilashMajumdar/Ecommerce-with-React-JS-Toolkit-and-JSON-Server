import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <Navbar>
      <AdminOrders />
    </Navbar>
  );
};

export default AdminOrdersPage;
