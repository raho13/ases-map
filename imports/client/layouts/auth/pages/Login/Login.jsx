import React from 'react'
import { Button, Col, Form, notification, Input, Row } from 'antd';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const onFinish = (values) => {

    Meteor.loginWithPassword(values.username, values.password, (err, res) => {
      if (!err) {
        const openNotification = (placement) => {
          api.success({
            message: `Təbriklər`,
            description:
              'Uğurla daxil oldunuz',
            placement,
            duration: 2
          });
        };
        openNotification('top')
      window.location.pathname = 'locations'
      }
      else {
        console.log(err)
        const openNotification = (placement) => {
          api.error({
            message: `Uğursuz`,
            description:
              'İstifadəçi adı vəya şifrə yanlışdır',
            placement,
            duration: 3
          });
        };
        openNotification('top')
      }
    })


  };

  return (
    <Row style={{ marginTop: '50px' }} gutter={24}>
      {contextHolder}
      <Col span={8}></Col>
      <Col span={10}>
        <h1>Daxil ol</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}

          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Daxil ol
            </Button>
          </Form.Item>
        </Form>
      </Col>

    </Row>
  )



};
export default Login;
