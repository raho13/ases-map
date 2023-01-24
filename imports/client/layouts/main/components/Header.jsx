import React from 'react'
import { Space, Table, Modal, Button, Input, Row, Col, Select, Form } from 'antd';
import { BsSearch } from 'react-icons/bs'
export default function Header({ showModal, query, onQueryChange }) {
    return (
        <Form onFinish={(values) => {
            const query = {}
            const status_to_boolean = {
                "aktiv": true, "deaktiv": false,
            }
            values.status = status_to_boolean[values.status]

            query.status = values.status
            onQueryChange(query)
            console.log(values)
        }} initialValues={{
            status: query.status === true ? "aktiv" : "deaktiv"
        }}>
            <Row >
                <Col span={12}>
                    <Space size={'large'}>
                        <Button size='large' type="primary" onClick={showModal} >Ünvan əlavə et</Button>

                    </Space>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col>
                            <Input placeholder="Axtar" size='large' />
                        </Col>
                        <Col>
                            <Space size={'large'}>
                                <Form.Item name="status">
                                    <Select>
                                        <Select.Option value="aktiv">Aktiv</Select.Option>
                                        <Select.Option value="deaktiv">Deaktiv</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Col>
                        <Col>
                            <Button size='large' type="primary" htmlType='submit' ><BsSearch /> </Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Form>
    )
}
