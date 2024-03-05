export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData?.email;
    const password = userData?.password;
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    if (data[0]) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}

export function logOutUser() {
  return new Promise(async (resolve) => {
    resolve({ message: "Logged Out successfully!" });
  });
}
