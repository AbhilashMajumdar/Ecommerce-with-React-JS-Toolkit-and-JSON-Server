export function addToCart(cartData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cartData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/cart/${updatedItem?.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedItem),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function removeCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId(userId);
    const items = await response.data;
    for (let item of items) {
      await removeCart(item.id);
    }
    resolve({ message: "Cart reset successfully!" });
  });
}
