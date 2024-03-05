import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAsync,
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../order/orderSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalItems = useSelector(selectTotalOrders);
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(-1);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ _sort: "", _order: "asc" });

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  const handleView = (id) => {
    navigate(`/admin/orderdetails/${id}`);
  };

  const handleStatus = (order, status) => {
    const updatedOrder = { ...order, status: status };
    dispatch(updateOrderAsync(updatedOrder));
    setShowStatus(-1);
  };

  const handleDelete = (id) => {
    dispatch(deleteOrderAsync(id));
  };

  const setStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-pink-400";
      case "Delivered":
        return "bg-green-400";
      case "Cancel":
        return "bg-red-400";
      case "Shipped":
        return "bg-blue-400";
      case "In Progress":
        return "bg-yellow-400";
    }
  };

  const handleSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th
              className="p-3 cursor-pointer font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              onClick={(e) =>
                handleSort({
                  sort: "id",
                  order: sort._order === "asc" ? "desc" : "asc",
                })
              }
            >
              Order Id{" "}
              {sort._id === "id" && sort._order === "asc" ? (
                <FaArrowUp className="h-6 w-6 inline" />
              ) : (
                <FaArrowDown className="h-6 w-6 inline" />
              )}
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Items with Quantity
            </th>
            <th
              className="p-3 cursor-pointer font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              onClick={(e) =>
                handleSort({
                  sort: "subTotal",
                  order: sort._order === "asc" ? "desc" : "asc",
                })
              }
            >
              Price{" "}
              {sort._id === "subTotal" && sort._order === "asc" ? (
                <FaArrowUp className="h-6 w-6 inline" />
              ) : (
                <FaArrowDown className="h-6 w-6 inline" />
              )}
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Status
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Order Id
                </span>
                {order.id}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Items
                </span>
                {order?.cartItems?.map((item) => (
                  <div>
                    {item.title}, Qty -{item.quantity}
                  </div>
                ))}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Price
                </span>
                ${order.subTotal}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Status
                </span>
                {/* bg-red-400 */}
                {showStatus !== index ? (
                  <span
                    className={`rounded ${setStatusColor(
                      order.status
                    )} py-1 px-3 text-xs font-bold`}
                  >
                    {order.status}
                  </span>
                ) : (
                  <select
                    name="status"
                    id="status"
                    onChange={(e) => handleStatus(order, e.target.value)}
                  >
                    <option>--Select Status--</option>
                    <option value={"Pending"}>Pending</option>
                    <option value={"Delivered"}>Delivered</option>
                    <option value={"Cancel"}>Cancel</option>
                    <option value={"Shipped"}>Shipped</option>
                    <option value={"In Progress"}>In Progress</option>
                  </select>
                )}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                <div>
                  <button
                    type="button"
                    onClick={(e) => handleView(order.id)}
                    className="rounded-md border border-transparent bg-green-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-green-700 mr-3"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={(e) => setShowStatus(index)}
                    className="rounded-md border border-transparent bg-blue-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(order.id)}
                    className="rounded-md border border-transparent bg-red-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        totalItems={totalItems}
      />
    </div>
  );
};

export default AdminOrders;
