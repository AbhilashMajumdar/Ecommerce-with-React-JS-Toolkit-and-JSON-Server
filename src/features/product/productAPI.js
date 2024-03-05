export function fetchFilterProducts(filter, sort, pagination) {
  let queryString = "";

  // filter
  for (let key in filter) {
    const categoryValues = filter[key];
    const lastCategoryValue = categoryValues[categoryValues.length - 1];
    if (lastCategoryValue) {
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  // sort
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  //pagination
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    const totalProducts = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalProducts: totalProducts } });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${updatedItem.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    resolve({ data });
  });
}
