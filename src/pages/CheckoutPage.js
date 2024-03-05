import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { discountedPrice } from "../common/DiscountedPrice";
import { useForm } from "react-hook-form";
import {
  selectUserInfo,
  updateUserInfoAsync,
} from "../features/user/userSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { useAlert } from "react-alert";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(true);
  const alert = useAlert();
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("Cash");
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const currentOrder = useSelector(selectCurrentOrder);

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

  const handleRemoveCart = (item, id) => {
    dispatch(removeCartAsync(id));
  };

  const onSubmit = (data) => {
    if (!user.addresses) {
      const updatedUser = { ...user, addresses: [data] };
      dispatch(updateUserInfoAsync(updatedUser));
    } else {
      const updatedUser = { ...user, addresses: [...user.addresses, data] };
      dispatch(updateUserInfoAsync(updatedUser));
    }
    alert.success('Address successfully added!');
    reset();
  };

  const handleOrder = () => {
    if (address && payment) {
      const orderedData = {
        cartItems,
        address,
        payment,
        user,
        subTotal,
        totalItemsInCart,
        status: "Pending",
      };
      dispatch(createOrderAsync(orderedData));
      alert.success('Order placed successfully!');
    }
  };

  return (
    <>
      {currentOrder && (
        <Navigate to={`/orderSuccess/${currentOrder?.id}`} replace={true} />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mt-10">
          <div className="col-span-3">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white px-8 lg:my-10 sm:my-0">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center py-6">
                  Checkout
                </h1>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Shipping Information
                  </h2>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p> */}

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Full Name  */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          id="name"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email  */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          id="email"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Number  */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone Number is required",
                          })}
                          type="tel"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Country  */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          id="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          type="text"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.country && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Street  */}
                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street Address is required",
                          })}
                          id="street"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* city  */}
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* State */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="state"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* pincode  */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pin Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Pin code is required",
                          })}
                          id="pincode"
                          autoComplete=""
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pincode && (
                          <p role="alert" className="text-red-500 my-2">
                            {errors.pincode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="reset"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <div>
                    <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
                      Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Please select from existing addresses
                    </p>
                    <ul role="list" className="divide-y divide-gray-100">
                      {user?.addresses?.map((address) => (
                        <li
                          key={address.name}
                          className="flex justify-between gap-x-6 py-5 border-gray-300 border-2 px-4 my-4"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              id="address"
                              name="address"
                              onChange={(e) => setAddress(address)}
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-6 text-gray-600">
                                {address.email}
                              </p>
                              <p className="mt-1 truncate text-xs leading-6 text-gray-600">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-xs leading-6 text-gray-600">
                              {address.street}
                            </p>
                            <p className="text-xs leading-6 text-gray-600">
                              {address.city}
                            </p>
                            <p className="text-xs leading-6 text-gray-600">
                              {address.pincode}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Method
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="Card"
                            name="paymentOption"
                            type="radio"
                            value={"Card"}
                            defaultChecked={payment === "Card"}
                            onChange={(e) => setPayment(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="Cash"
                            name="paymentOption"
                            type="radio"
                            value={"Cash"}
                            defaultChecked={payment === "Cash"}
                            onChange={(e) => setPayment(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-2">
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
                              <button
                                onClick={(e) => handleRemoveCart(item, item.id)}
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
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay & Order
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
