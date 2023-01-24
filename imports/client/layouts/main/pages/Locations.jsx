import React, { useEffect, useState } from 'react'
import { Space, Table, Modal, Button, Input, Row, Col, Select, Form } from 'antd';
import { useTracker } from 'meteor/react-meteor-data'
import { LocationsCollection } from '../../../../api/locations/collection';
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import LocationModal from '../components/LocationModal';


export default function Locations() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState({ status: true})
    const [sort, setSort] = useState({})
    const [total, setTotal] = useState(0)
    const [LocationData, setLocationData] = useState({
        name: "",
        shortname: "",
        lat: "",
        long: "",
        country: "",
        city: "",
        stage: "",
        region: "",
        street: "",
        number: "",
        id: "",
        famous_name: "",
        status: true,
        locationId: "33",
    })
    const [resetData, setResetData] = useState(LocationData)
    //Get
    const data = useTracker(() => {
        const result = {}
        result.ready = Meteor.subscribe('get_locations', query, limit, skip, sort).ready()
        result.locations = LocationsCollection.find(
            query,
        ).fetch()
        return result;
    }, [limit, skip, query, sort])
    useEffect(() => {
        Meteor.call('count_locations', query, function (err, res) {
            if (res) {
                setTotal(res)
            }
            else if (err) {
                console.log(err)
            }
        })
    }, [query, data.locations.length])
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
        },
        {
            title: 'Edit',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setLocationData(record)
                        showModal()
                    }}>
                        <AiFillEdit />
                    </Button>
                    <Button onClick={() => {
                        setIsMiniModalOpen(record)
                    }}>
                        <RiDeleteBin6Line />
                    </Button>
                </Space>
            )
        }
    ];

    useEffect(() => {
        !isModalOpen ? setLocationData(resetData) : null
    }, [isModalOpen])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (LocationData._id) {
            //Update
            Meteor.call("update_location", LocationData._id, LocationData, (err, res) => {
                res ? setIsModalOpen(false) : console.log(err)
            })
            setLocationData(resetData)
        } else {
            //Create
            Meteor.call("add_location", LocationData, (err, res) => {
                res ? setIsModalOpen(false) : console.log(err)
            })
            setLocationData(resetData)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const deleteCancel = () => {
        setIsMiniModalOpen(false)
    };
    const deleteLocation = () => {
        Meteor.call("delete_location", isMiniModalOpen._id)
        setIsMiniModalOpen(false)

    };
    const onLimitChange = (limit) => {
        setLimit(limit)
    }
    const onSkipChange = (skip) => {
        setSkip(skip)
    }
    function onQueryChange(new_query) {
        setQuery({ ...query, ...new_query })
    }
    return (
        <>
            <Header onQueryChange={onQueryChange} showModal={showModal} query={query} />
            <Table rowKey="_id" pagination={{
                pageSize: limit,

                showSizeChanger: true,
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

            <Modal
                title="Ünvan əlavə et"
                width={"80%"}
                open={isModalOpen}
                onOk={() => {
                    handleOk()
                }}
                onCancel={handleCancel}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Input placeholder="Tam ünvan adı" onChange={(e) => {
                            setLocationData({ ...LocationData, name: e.target.value })
                        }}
                            value={LocationData.name} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Qısa ünvan adı" onChange={(e) => {
                            setLocationData({ ...LocationData, shortname: e.target.value })
                        }}
                            value={LocationData.shortname} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Lat" onChange={(e) => {
                            setLocationData({ ...LocationData, lat: e.target.value })
                        }}
                            value={LocationData.lat} type="number" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Long" onChange={(e) => {
                            setLocationData({ ...LocationData, long: e.target.value })
                        }}
                            value={LocationData.long} type="number" />
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, country: e })
                            }}

                            style={{
                                width: '100%',
                            }}
                            value={LocationData.country === "" ? 'Ölkə' : LocationData.country}
                        >

                            <Option value="Azərbaycan" >Azərbaycan</Option>
                            <Option value="Gürcüstan" >Gürcüstan</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, city: e })
                            }}

                            style={{
                                width: '100%',
                            }}
                            value={LocationData.city === "" ? 'Şəhər' : LocationData.city}


                        >
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, stage: e })
                            }}
                            style={{
                                width: '100%',
                            }}
                            value={LocationData.stage === "" ? 'Bölgə' : LocationData.stage} >

                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, region: e })
                            }}
                            style={{
                                width: '100%',
                            }}

                            value={LocationData.region === "" ? 'Region' : LocationData.region}
                        >
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Input placeholder="Küçə/prospekt" onChange={(e) => {
                            setLocationData({ ...LocationData, street: e.target.value })
                        }}
                            value={LocationData.street} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Nömrə" type='number' onChange={(e) => {
                            setLocationData({ ...LocationData, number: e.target.value })
                        }}
                            value={LocationData.number} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="İd" disabled value={LocationData._id} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Məhşur adı" onChange={(e) => {
                            setLocationData({ ...LocationData, famous_name: e.target.value })
                        }}
                            value={LocationData.famous_name} />
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, status: e })
                            }}

                            style={{
                                width: '100%',
                            }}
                            value={LocationData.status ? 'Aktiv' : "Deaktiv"}
                        >
                            <Option value={true} >Aktiv</Option>
                            <Option value={false} >Deaktiv</Option>
                        </Select>
                    </Col>

                </Row>

            </Modal>
            <Modal
                title="Diqqət!!!"
                width={"40%"}
                open={isMiniModalOpen}
                onOk={deleteLocation}
                okText="Sil"
                cancelText="ləğv et"
                type="warning"
                onCancel={deleteCancel}>
                Seçilən element silinsin?
            </Modal>
        </>
    )
}

function Header({ showModal, query, onQueryChange }) {
    return <Form onFinish={(values) => {
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
}