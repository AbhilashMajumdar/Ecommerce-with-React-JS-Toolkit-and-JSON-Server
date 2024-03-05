import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrderByIdAsync, selectUserInfo, selectUserOrder } from "../userSlice";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrderByIdAsync(user.id));
    }
  }, [dispatch, user.id]);

  return (
    <div>
      {orders.map((order, index) => (
        <div
          className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8"
          key={index}
        >
          <div className="mt-8">
            <h1 className="py-5 text-2xl font-bold tracking-tight text-gray-900">
              Order Id #{order.id}
            </h1>
            <h1 className="py-5 text-xl font-bold tracking-tight text-red-900">
              Status : {order.status}
            </h1>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
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
                            <a href={item.href}>{item.name}</a>
                          </h3>
                          <div>
                            <p className="ml-4">${item.discountedPrice}</p>
                            <p className="ml-4 line-through text-gray-500">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          <span className="mr-5">Qty: {item.quantity}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Payment Mode </p>
              <p>{order.payment}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{order.totalItemsInCart}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{order.totalAmounts}</p>
            </div>
            
            <div className="text-base mt-5 font-medium text-gray-900">
              <p>Shipping Information :-</p>
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.address.email}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.address.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.address.street}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.address.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.address.pin}
                  </p>
                </div>
              </li>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
