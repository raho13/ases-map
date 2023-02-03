import React, { useState, useRef } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Highlighter from 'react-highlight-words';
import { Space, Table, Modal, Button, Input } from 'antd';
export default function LocationsTable({
    limit,
    total,
    skip, data,
    ModalVisible,
    onLimitChange,
    onSkipChange
}) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Axtar `}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Axtar
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters
                            handleReset(clearFilters)
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Sil
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Bağla
                    </Button>
                </Space>
            </div>
        ),

        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: '#',
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
            ...getColumnSearchProps('locationId'),
        },
        {
            title: 'Ünvan',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Şəhər',
            dataIndex: 'city',
            key: 'city',
            ...getColumnSearchProps('city'),
        },
        {
            title: 'Lat',
            dataIndex: 'lat',
            key: 'lat',
            ...getColumnSearchProps('lat'),
        },
        {
            title: 'Long ',
            dataIndex: 'long',
            key: 'long',
            ...getColumnSearchProps('long'),
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
