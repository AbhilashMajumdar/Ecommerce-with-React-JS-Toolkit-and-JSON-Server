export function createOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchOrdersByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/orders?user.id=${userId}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(pagination, sort) {
  let queryString = "";

  // sort 
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // pagination 
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?${queryString}`);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: totalOrders } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${order.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteOrder(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id } });
  });
}
