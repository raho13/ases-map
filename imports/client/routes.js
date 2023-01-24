import React from "react";
import Login from "./layouts/auth/pages/Login/Login";
import Layout from "./layouts/main/Layout";
// import Main from "./layouts/main/Main";
import Locations from "./layouts/main/pages/Locations";


export const routes = [
  {
    path: "/*",
    element: <Layout />,
  },
];

