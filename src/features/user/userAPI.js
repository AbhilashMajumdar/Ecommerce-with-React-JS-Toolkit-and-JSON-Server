export function fetchUserInfoById(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUserInfo(updatedData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/users/${updatedData.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
