import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Space, Table, Modal, Button, Input, Row, Col, Select, Form } from 'antd';
export default function LocationsTable({
    limit,
    total,
    skip, data,
    ModalVisible,
    onLimitChange,
    onSkipChange
}) {
    const columns = [
        {
            title: 'Nömrəsi',
            dataIndex: 'locationId',
            key: 'locationId',
            render: (text, record, index) => (
                < >
                    {index + 1}
                </ >
            )
        },
        {
            title: 'Ünvan İD',
            dataIndex: 'locationId',
            key: 'locationId',
        },
        {
            title: 'Ünvan',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Bölgə',
            dataIndex: 'stage',
            key: 'stage',
        },
        {
            title: 'Lat',
            dataIndex: 'lat',
            key: 'lat',
        },
        {
            title: 'Long ',
            dataIndex: 'long',
            key: 'long',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                <>
                    {record.status ? "Aktiv" : "Deaktiv"}
                </>
            )
        },
        {
            title: 'Düzəlt',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => {
                        ModalVisible(record, 1)
                    }}>
                        <AiFillEdit />
                    </Button>
                    {/* <Button onClick={() => {
                        ModalVisible(record, 0)
                    }}>
                        <RiDeleteBin6Line />
                    </Button> */}
                </Space>
            )
        }
    ];
    return (
        <Table rowKey="_id"
            pagination={{
                pageSize: limit,
                showSizeChanger: true,
                position: ["none", "bottomCenter"],
                total: total,
                onShowSizeChange: (e, newSize) => {
                    onLimitChange(newSize)
                    // setLimit(newSize);
                    // setSkip(0);
                },
                onChange(page_num, pageSize) {
                    onSkipChange(page_num * pageSize - pageSize)
                    // setSkip(page_num * pageSize - pageSize);
                },
                showQuickJumper: true,
                locale: {
                    items_per_page: "hər səhifədə / " + total,
                    jump_to: "get",
                    page: "səhifəyə",
                },
                current: (skip + limit) / limit,
            }} style={{ marginTop: '20px' }} columns={columns} dataSource={data.locations} />
    )
}
