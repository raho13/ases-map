import { Row, Col } from 'antd';
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import { Header } from './components/Header';


export default function Layout() {
  return (
    <>
      <Header />
      <Row>
        <Col span={3}>
          <NavMenu />
        </Col >
        <Col span={21}>
          <Outlet></Outlet>
        </Col >
      </Row>
    </>
  )
}
