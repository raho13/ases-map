import React from 'react'
import { Space, Table, Tag, Button, Input, Row, Col } from 'antd';
// import { AiOutlineSearch } from 'react-icons';
// import { FaBeer } from "@react-icons/all-files/fa/FaBeer"
const columns = [
    {
        title: 'Nömrəsi',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ünvan İD',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Ünvan',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Bölgə',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Lat',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Long ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Status',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Edit',
        dataIndex: 'address',
        key: 'address',
    }

];
const data = [
    {
        key: 'lorem',
        name: 'lorem',
        age: 'lorem',
        address: 'lorem',
        tags: 'lorem',
    },
    {
        key: 'lorem2',
        name: 'lorem2',
        age: 'lorem2',
        address: 'lorem2',
        tags: 'lorem2',
    },
];
export default function Locations() {
    return (
        <>
            <Row >
                <Col span={12}>
                    <Space size={'large'}>
                        <Button size='large' >Müştəri əlavə et </Button>
                        <Input placeholder="Axtar" size='large' prefix={''} />
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={'large'}>

                        <Button size='large' >Dis </Button>
                        <Button size='large' >Av </Button>
                    </Space>
                </Col>
            </Row>

            <Table columns={columns} dataSource={data} />

        </>
    )
}
