import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
export default async function authenticate() {
  console.log("process.env.email", process.env.NEXT_PUBLIC_EMAIL);
  console.log("process.env.password :>> ", process.env.NEXT_PUBLIC_PASSWORD);
  await axios
    .post<any>(
      `http://localhost:5000/api/auth/signin`,
      {
        email: process.env.NEXT_PUBLIC_EMAIL,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      },
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

export function getStaticProps() {
  console.log(
    "[Node.js only] NEXT_PUBLIC_EMAIL:",
    process.env.NEXT_PUBLIC_EMAIL
  );
  console.log(
    "[Node.js only] NEXT_PUBLIC_PASSWORD:",
    process.env.NEXT_PUBLIC_PASSWORD
  );

  return { props: {} };
}
