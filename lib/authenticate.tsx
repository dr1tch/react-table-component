import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
export default async function authenticate() {
  await axios
    .post<any>(
      `http://localhost:5000/api/auth/signin`,
      { email: "admin@admin.dz", password: "123456789" },
      { withCredentials: true }
    )
    .then((res) => {
      console.log("res", res);
      console.log("Object.keys(res.data) :>> ", Object.keys(res.data));
      if (Object.keys(res.data).length > 0) {
        // localStorage.setItem("tah", JSON.stringify(1));
        // localStorage.setItem("uid", JSON.stringify(res.data.user));
        // localStorage.setItem("mid", JSON.stringify(res.data.menus));
      }
      console.log("res", res);
      return res.data;
    })
    .catch((error) => {
      console.log("error", error.response.data);
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}
