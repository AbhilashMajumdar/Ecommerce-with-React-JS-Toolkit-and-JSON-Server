import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProduct,
  updateProductAsync,
} from "../product/productSlice";
import { Navigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Modal from "../../common/Modal";

const AdminProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const product = useSelector(selectProduct);
  const [backtoAdminPage, setBackToAdminPage] = useState(false);
  const id = useParams().id;
  const alert = useAlert();
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && id) {
      setValue("title", product?.title);
      setValue("description", product?.description);
      setValue("brand", product?.brand);
      setValue("category", product?.category);
      setValue("price", product?.price);
      setValue("stock", product?.stock);
      setValue("discountPercentage", product?.discountPercentage);
      setValue("rating", product?.rating);
      setValue("thumbnail", product?.thumbnail);
      setValue("img1", product?.images[0]);
      setValue("img2", product?.images[1]);
      setValue("img3", product?.images[2]);
      setValue("img4", product?.images[3]);
    }
  }, [dispatch, product, id]);

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      images: [data.img1, data.img2, data.img3, data.img4, data.thumbnail],
      stock: Number(data.stock),
      rating: Number(data.rating),
      price: Number(data.price),
      discountPercentage: Number(data.discountPercentage),
    };
    delete updatedData["img1"];
    delete updatedData["img2"];
    delete updatedData["img3"];
    delete updatedData["img4"];

    if (id) {
      updatedData.id = id;
      // update existing product and dispatch the existing product in redux as well as product api
      dispatch(updateProductAsync(updatedData));
      alert.success("Product updated successfully!");
    } else {
      // create new product and dispatch the new product in redux as well as product api
      dispatch(createProductAsync(updatedData));
      alert.success("Product added successfully!");
    }
    reset();
    setBackToAdminPage(true);
  };

  const handleDelete = () => {
    const newProduct = { ...product, deleted: true };
    dispatch(updateProductAsync(newProduct));
    alert.success("Product deleted!");
    reset();
    setBackToAdminPage(true);
  };

  return (
    <>
      {backtoAdminPage && <Navigate to={"/admin"} replace={true} />}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white px-8 lg:my-10 sm:my-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-left py-6">
            {id ? "Edit Product" : "Add New Product"}
          </h1>
          {product.deleted && (
            <p className="text-xl font-bold tracking-tight text-red-500 text-left py-6">
              Product Deleted
            </p>
          )}
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/*Product title  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("title", {
                      required: "Product Title is required",
                    })}
                    id="title"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.title && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Description  */}
              <div className="sm:col-span-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("description", {
                      required: "Product Description is required",
                    })}
                    id="description"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.description && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Brand  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium leading-6 text-gray-900"
                >
                  Product Brand
                </label>
                <select
                  {...register("brand", {
                    required: "Product Brand is required",
                  })}
                  id="brand"
                >
                  <option>--Select Brand--</option>
                  {brands.map((brand, index) => (
                    <option value={brand.value} key={index}>
                      {brand.label}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <p role="alert" className="text-red-500 my-2">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              {/* Product Category  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium leading-6 text-gray-900"
                >
                  Product Category
                </label>
                <select
                  {...register("category", {
                    required: "Product Category is required",
                  })}
                  id="category"
                >
                  <option>--Select Category--</option>
                  {categories.map((category, index) => (
                    <option value={category.value} key={index}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p role="alert" className="text-red-500 my-2">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Price  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    {...register("price", {
                      required: "Product Price is required",
                    })}
                    type="Number"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Discount Percentage  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "Product Discount Percentage is required",
                    })}
                    type="Number"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.discountPercentage && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Stock  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "Product Stock is required",
                    })}
                    type="Number"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.stock && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating  */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Rating
                </label>
                <div className="mt-2">
                  <input
                    id="rating"
                    {...register("rating", {
                      required: "Product Rating is required",
                    })}
                    type="Number"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.rating && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Thumbnail  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "Product Thumbnail is required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.thumbnail && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image1  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="img1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    id="img1"
                    {...register("img1", {
                      required: "Image 1 is required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.img1 && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.img1.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image2  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="img2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    id="img2"
                    {...register("img2", {
                      required: "Image 2 is required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.img2 && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.img2.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image3  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="img3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    id="img3"
                    {...register("img3", {
                      required: "Image 3 is required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.img3 && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.img3.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Image4  */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="img4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    id="img4"
                    {...register("img4", {
                      required: "Image 4 is required",
                    })}
                    type="text"
                    autoComplete=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.img4 && (
                    <p role="alert" className="text-red-500 my-2">
                      {errors.img4.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              {id && !product.deleted && (
                <button
                  type="reset"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal(product.id);
                  }}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  // e.preventDefault();
                  reset();
                  setBackToAdminPage(true);
                }}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {id ? "Save Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        title={"Delete"}
        message={`Are you sure want to delete ${product.title} ?`}
        dangerOption={"Delete"}
        cancelOption={"Cancel"}
        dangerAction={handleDelete}
        cancelAction={(e) => setOpenModal(null)}
        showModal={openModal === product.id}
      />
    </>
  );
};

export default AdminProductForm;
