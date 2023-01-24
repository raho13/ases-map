import React, { useState } from 'react'
import { Space, Table, Modal, Button, Input, Row, Col, Select } from 'antd';
import { useTracker } from 'meteor/react-meteor-data'
import { LocationsCollection } from '../../../../api/locations/collection';
import { AiFillEdit } from 'react-icons/ai'


export default function Locations() {
    //Get
    const data = useTracker(() => {
        Meteor.subscribe('get_locations')
        const locations = LocationsCollection.find().fetch()
        return locations;
    }, [])

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
            dataIndex: 'country',
            key: 'country',
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
                </Space>
            )
        }
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        group: "",
        status: "",
        locationId: "",
    })
    const [resetData, setResetData] = useState(LocationData)


    const showModal = () => {

        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (LocationData._id) {
            //Update
            Meteor.call("update_location", LocationData._id, LocationData, (err, res) => {
                res ? setIsModalOpen(false) : console.log(err)
            })
        } else {
            //Create
            Meteor.call("add_location", LocationData, (err, res) => {
                res ? setIsModalOpen(false) : console.log(err)
            })
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Row >
                <Col span={12}>
                    <Space size={'large'}>
                        <Button size='large' type="primary" onClick={showModal} >Ünvan əlavə et  </Button>
                        <Input placeholder="Axtar" size='large'
                        />
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={'large'}>
                        <Button size='large' >Dis</Button>
                        <Button size='large' >Av</Button>
                    </Space>
                </Col>
            </Row>

            <Table rowKey="_id" style={{ marginTop: '20px' }} columns={columns} dataSource={data} />
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
                        <Input placeholder="Qrupla"
                            value={LocationData.group} disabled />
                    </Col>
                    <Col span={6}>
                        <Select
                            onChange={(e) => {
                                setLocationData({ ...LocationData, status: e })
                            }}

                            style={{
                                width: '100%',
                            }}
                            value={LocationData.status === "" ? 'Status' : LocationData.status}
                            defaultValue="Status">
                            <Option value="İstifadəçi" >İstifadəçi</Option>
                            <Option value="Admin" >Admin</Option>
                            <Option value="Superadmin" >Superadmin</Option>
                        </Select>
                    </Col>

                </Row>

            </Modal>
        </>
    )
}
