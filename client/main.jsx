import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
// import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import App from "../imports/client/App";
// import az_AZ from 'antd/lib/locale/az_AZ';
Meteor.startup(() => {
  render(
    // <ConfigProvider locale={az_AZ} >
    <App />,
    // </ConfigProvider>,
    document.getElementById("react-target")
  );
});