import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserInfo, updateUserInfoAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

const UserProfile = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedFormAddress, setSelectedFormAddress] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const alert = useAlert();

  const handleAddAddress = (data) => {
    if (!user.addresses) {
      const address = { ...user, addresses: [data] };
      dispatch(updateUserInfoAsync(address));
    } else {
      const address = { ...user, addresses: [...user.addresses, data] };
      dispatch(updateUserInfoAsync(address));
    }
    alert.success('Address added successfully!');
    reset();
    setShowAddAddressForm(false);
  };

  const handleEditForm = (index) => {
    setSelectedFormAddress(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('city', address.city);
    setValue('phone', address.phone);
    setValue('country', address.country);
    setValue('street', address.street);
    setValue('pincode', address.pincode);
    setValue('state', address.state);
  }

  const handleEdit = (address, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, address);
    dispatch(updateUserInfoAsync(newUser));
    alert.success('Address updated successfully!');
    setSelectedFormAddress(-1);
    reset();
  }

  const handleRemove = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserInfoAsync(newUser));
  };

  return (
    <>
      <div>
        <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900 text-left py-4">
          Profile :-
        </h1>
      </div>
      <div>
        <h1 className="text-2xl pb-2 font-bold tracking-tight text-red-900 text-left">
          Email : {user?.email}
        </h1>
      </div>
      <div>
        <h1 className="text-xl pb-2 font-bold tracking-tight text-red-900 text-left">
          Role : {user?.role}
        </h1>
      </div>
      <div>
        {selectedFormAddress === -1 && <div className="my-5">
          <button
            type="button"
            onClick={(e) => setShowAddAddressForm(true)}
            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Add New Address
          </button>
        </div>}
        {showAddAddressForm && (
          <div>
          <form noValidate onSubmit={handleSubmit((data)=>{
            handleAddAddress(data);
            reset();
          })}>
            <div className="bg-white px-8 py-5 lg:my-10 sm:my-0">
              <div className="border-b border-gray-900/10 pb-12">
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
                    onClick={(e)=>setShowAddAddressForm(false)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        )}
      </div>
      {!user.addresses ? (
        <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900 text-left py-4">
          You don't have any address, Please add to see here.
        </h1>
      ) : (
        <div>
          <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
            {selectedFormAddress === -1 && !showAddAddressForm && 'All Addresses'}
            {selectedFormAddress >=0 && 'Edit Address'}
          </h2>
         { !showAddAddressForm && <ul role="list" className="divide-y divide-gray-100">
            {user?.addresses?.map((address, index) => (
              <div>
                {selectedFormAddress === index ? (
                  <div>
                    <form noValidate onSubmit={handleSubmit((data)=>{
                      handleEdit(data, index);
                      reset();
                    })}>
                      <div className="bg-white px-8 py-5 lg:my-10 sm:my-0">
                        <div className="border-b border-gray-900/10 pb-12">
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
                              onClick={(e)=>setSelectedFormAddress(-1)}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
                <li
                  key={address.name}
                  className="flex justify-between gap-x-6 py-5 border-gray-300 border-2 px-4 my-4 sm:px-2 sm:my-2"
                >
                  <div className="flex min-w-0 gap-x-4">
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
                  <div className="">
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
                  <div className="">
                    <div className="mb-5">
                      <button
                        type="button"
                        onClick={(e)=>handleEditForm(index)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-green-700"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <button
                          type="button"
                          onClick={(e) => handleRemove(index)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-2 sm:px-2 sm:py-1 text-base font-medium text-white shadow-sm hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>}
        </div>
      )}
    </>
  );
};

export default UserProfile;
