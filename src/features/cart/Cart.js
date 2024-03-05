import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCartAsync, selectCartItems, updateCartAsync } from "./cartSlice";
import { discountedPrice } from "../../common/DiscountedPrice";
import Modal from "../../common/Modal";
import { useAlert } from "react-alert";

export function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [openModal, setOpenModal] = useState(null);
  const alert = useAlert();

  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  );

  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleUpdateCart = (item, qty) => {
    const updatedItem = { ...item, quantity: Number(qty) };
    dispatch(updateCartAsync(updatedItem));
  };

  const handleRemoveCart = (e, item) => {
    dispatch(removeCartAsync(item.id));
    alert.success(`${item.title} deleted successfully!`);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <main className="grid min-h-full place-items-center mt-24 bg-white px-6 py-24 sm:py-24 lg:px-8">
          <div className="">
            {/* <p className="text-3xl font-bold tracking-tight sm:text-5xl text-indigo-600">
              
            </p> */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Empty Shopping Cart
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Please add a product to see Shopping Cart.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center py-6">
              Shopping Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((item) => (
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
                            <p className="ml-4 text-gray-500 line-through">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                        {/* <p className="mt-1 text-sm text-gray-500">
                      {item.color}
                    </p> */}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          Qty
                          <select
                            className="ml-4"
                            onChange={(e) =>
                              handleUpdateCart(item, e.target.value)
                            }
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                          </select>
                        </p>

                        <div className="flex">
                          <Modal
                            title={"Delete"}
                            message={`Are you sure want to delete ${item.title} ?`}
                            dangerOption={"Delete"}
                            cancelOption={"Cancel"}
                            dangerAction={(e)=>handleRemoveCart(e, item)}
                            cancelAction={(e)=>setOpenModal(null)}
                            showModal={openModal === item.id}
                          />
                          <button
                            // onClick={(e) => handleRemoveCart(item.id)}
                            onClick={(e) => setOpenModal(item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Total Items In Cart</p>
              <p>{totalItemsInCart}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to={"/checkout"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to={"/"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
