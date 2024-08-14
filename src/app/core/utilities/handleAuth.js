import axios from "axios";

export async function handleSignin(reqBody) {
  const BASE_URL = process.env.REACT_APP_BASE_API;
  await axios
    .post(`${BASE_URL}/auth/signin`, reqBody)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    })
    .catch((err) => {});

  return {
    success: true,
    message: "Sign in successful",
  };
}
