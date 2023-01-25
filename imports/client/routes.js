import React from "react";
import Login from "./layouts/auth/pages/Login/Login";
import Layout from "./layouts/main/Layout";
// import Main from "./layouts/main/Main";


export const routes = [
  {
    path: "/*",
    element: <Layout />,
  },
];

