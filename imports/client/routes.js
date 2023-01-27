import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./layouts/auth/pages/Login/Login";
import Layout from "./layouts/main/Layout";
import Locations from "./layouts/main/pages/locations/Locations";
import { Settings } from "./layouts/main/pages/settings/Settings";
import Users from "./layouts/main/pages/users/Users";
import { useTracker } from "meteor/react-meteor-data"
import { Spin } from "antd";
function Init() {
  const navigate = useNavigate()
  const { loading } = useTracker(() => {
    const result = {
      loading: true
    }
    const user = Meteor.user()
    if (user === null) {
      setTimeout(() => {
        navigate("/login")
      }, 0)
      result.loading = false
      console.log("user login olmayib")
    } else if (user === undefined) {
      console.log("user login olub amma datasi gelmir hele")
      result.loading = true
    } else {
      result.loading = false
      console.log("user datasi gelib yeni login olub")
    }
    return result
  }, [])
  if (loading === true) return <Spin spinning={true}><div style={{ minHeight: "100vh" }}></div></Spin>
  return <>

    <Outlet></Outlet>
  </>
}



export const routes = [
  {
    path: "/",
    element: <Init />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "locations",
            element: <Locations />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }
];


