import { Row, Col } from 'antd';
import React from 'react'
import { useLocation } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import MainRouter from './MainRouter';


export default function Layout() {
  let location = useLocation();
  return (
    <>
      <Row>
        <Col span={3}>
          <NavMenu />
        </Col >
        <Col span={21}>
          <MainRouter path={location.pathname} />
        </Col >
      </Row>
    </>
  )
}
