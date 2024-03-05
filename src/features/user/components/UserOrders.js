import React from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "../../order/orderSlice";
import { discountedPrice } from "../../../common/DiscountedPrice";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const orders = useSelector(selectOrders);
  return (
    <div>
      <div>
        <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900 text-left py-4">
          Orders Details
        </h1>
      </div>
      <div>
        {orders.map((order, index) => (
          <ul role="list" className="divide-y divide-gray-200" key={index}>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-red-900 text-left py-3">
                Order Id #{order.id}
              </h1>
            </div>
            {order.cartItems?.map((item) => (
              <div>
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
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
                          <Link to={item.thumbnail}>{item.title}</Link>
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
                      <p className="text-gray-900">Qty :- {item.quantity}</p>
                    </div>
                  </div>
                </li>
              </div>
            ))}
            <div className="mb-10">
              <div className="flex my-2 justify-between text-base font-medium text-red-900">
                <p>Status</p>
                <p>{order.status}</p>
              </div>
              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p>Total Ordered Items</p>
                <p>{order.totalItemsInCart}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.subTotal}</p>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
