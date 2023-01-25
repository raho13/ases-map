import React from 'react'
import { Space, Table, Modal, Button, Input, Row, Col, Select, Form } from 'antd';
import { BsSearch } from 'react-icons/bs'
export default function Header({ showModal, query, onQueryChange }) {
    return (
        <Form onFinish={(values) => {
            const query = {}
            const status_to_boolean = {
                "aktiv": true,
                "deaktiv": false,
            }
            values.search = new RegExp(values.search)
            values.status = status_to_boolean[values.status]
            query.status = values.status
            query.name = values.search
            onQueryChange(query)
        }}
            initialValues={{
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
                            <Form.Item name="search">
                                <Input placeholder="Axtar" size='large' autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Space >
                                <Form.Item name="status">
                                    <Select style={{
                                        width: 100,
                                        marginLeft: 15,
                                        marginRight: 15
                                    }}
                                        size={'large'}>
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
