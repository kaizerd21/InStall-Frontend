

export function authHeaders() {
  const authToken = localStorage.getItem('authToken')
  // if (!authToken) {
  //   throw new Error("User unauthorized!")
  // }

  return {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  };
}
