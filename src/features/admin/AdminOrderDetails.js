import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { selectOrders } from "../order/orderSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { discountedPrice } from "../../common/DiscountedPrice";

const AdminOrderDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);

  const order = orders.filter((order) => order.id === Number(id));

  const handleBack = () => {
    navigate("/admin/orders");
  };

  return (
    <div className="px-4">
      <div>
        <button
          onClick={handleBack}
          className={`mt-10 cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          Back to All orders
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mt-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-left py-8">
            Order Details
          </h1>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-left py-3">
              Order Id #{order[0].id}
            </h1>
          </div>
          <div>
            <h1 className="text-xl mb-3 font-bold tracking-tight text-red-900 text-left py-3">
              Order Status - {order[0].status}
            </h1>
          </div>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {order[0].cartItems?.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={item.thumbnail}>{item.title}</Link>
                        </h3>
                        <div>
                          <p className="ml-4 text-gray-900">
                            $
                            {discountedPrice(
                              item.price,
                              item.discountPercentage
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty - {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Total Ordered Items</p>
            <p>{order[0].totalItemsInCart}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${order[0].subTotal}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl my-5 font-semibold leading-7 text-gray-900">
            Order Placed from the following address :-
          </h2>
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5 border-gray-300 border-2 px-4 my-4">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order[0].address.name}
                  </p>
                  <p className="mt-1 truncate font-semibold  text-sm leading-6 text-gray-900">
                    {order[0].address.email}
                  </p>
                  <p className="mt-1 truncate font-semibold  text-sm leading-6 text-gray-900">
                    {order[0].address.phone}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 font-semibold  text-gray-900">
                  {order[0].address.street}
                </p>
                <p className="text-sm leading-6 font-semibold  text-gray-900">
                  {order[0].address.city}
                </p>
                <p className="text-sm leading-6 font-semibold  text-gray-900">
                  {order[0].address.pincode}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
