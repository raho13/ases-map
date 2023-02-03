import { Button, Modal, Input, Row, Col, Select } from 'antd';
import React, { useEffect } from 'react';



const LocationModal = ({ resetData, setIsModalOpen, LocationData, setLocationData, isModalOpen }) => {
    const [query, setQuery] = React.useState({});
    const [sort, setSort] = React.useState({ createdAt: -1 })
    const [limit, setLimit] = React.useState(0);
    const [skip, setSkip] = React.useState(0);
    const [villages, setvillages] = React.useState([])
    const [districts, setdistricts] = React.useState([])
    const [cities, setcities] = React.useState([])
    const [rurals, setrurals] = React.useState([])
    useEffect(() => {
        Meteor.call("get_villages", query, limit, skip, sort, function (err, res) {
            if (res) {
                setvillages(res.dataSource)
            } else {
                console.log(err)
            }
        })
        Meteor.call("get_districts", query, limit, skip, sort, function (err, res) {
            if (res) {
                setdistricts(res.dataSource)
            } else {
                console.log(err)
            }
        })
        Meteor.call("get_cities", query, limit, skip, sort, function (err, res) {
            if (res) {
                setcities(res.dataSource)
            } else {
                console.log(err)
            }
        })
        Meteor.call("get_rurals", query, limit, skip, sort, function (err, res) {
            if (res) {
                setrurals(res.dataSource)
            } else {
                console.log(err)
            }
        })
    }, [])
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

    return (
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
                        style={{ border: "1px solid black" }}
                        value={LocationData.name} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Qısa ünvan adı" onChange={(e) => {
                        setLocationData({ ...LocationData, shortname: e.target.value })
                    }} style={{ border: "1px solid black" }}
                        value={LocationData.shortname} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Lat" onChange={(e) => {
                        if (Number(e.target.value) || e.target.value === '') {
                            setLocationData({ ...LocationData, lat: e.target.value })
                        }

                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.lat} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Long" onChange={(e) => {
                        if (Number(e.target.value) || e.target.value === '') {
                            setLocationData({ ...LocationData, long: e.target.value })
                        }
                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.long} />
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '20px', }}>
                <Col span={6} >
                    <Select
                        defaultValue={"Azərbaycan"}
                        onChange={(e) => {
                            setLocationData({ ...LocationData, country: e })
                        }}

                        style={{
                            width: '100%',
                        }}

                        value={LocationData.country === "" ? 'Azərbaycan' : LocationData.country}
                    >

                        <Select.Option value="Azərbaycan" >Azərbaycan</Select.Option>
                        <Select.Option value="Gürcüstan" >Gürcüstan</Select.Option>
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
                        {cities.map((city) => {
                            return <Select.Option key={city._id} value={city.data}>{city.data}</Select.Option>
                        })}

                    </Select>
                </Col>
                <Col span={6}>
                    <Select
                        onChange={(e) => {
                            setLocationData({ ...LocationData, district: e })
                        }}
                        style={{
                            width: '100%',
                        }}
                        value={LocationData.district === "" ? 'Rayon' : LocationData.district} >

                        {districts.map((district) => {
                            return <Select.Option key={district._id} value={district.data}>{district.data}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col span={6}>
                    <Select
                        onChange={(e) => {
                            setLocationData({ ...LocationData, village: e })
                        }}
                        style={{
                            width: '100%',
                        }}

                        value={LocationData.village === "" ? 'Qəsəbə' : LocationData.village}
                    >
                        {villages.map((village) => {
                            return <Select.Option key={village._id} value={village.data}>{village.data}</Select.Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={6}>
                    <Select
                        onChange={(e) => {
                            setLocationData({ ...LocationData, rural: e })
                        }}

                        style={{
                            width: '100%',
                        }}
                        value={LocationData.rural === "" ? 'Kənd' : LocationData.rural}
                    >
                        {rurals.map((rural) => {
                            return <Select.Option key={rural._id} value={rural.data}>{rural.data}</Select.Option>
                        })}

                    </Select>
                </Col>
                <Col span={6}>
                    <Input placeholder="Küçə/prospekt" onChange={(e) => {
                        setLocationData({ ...LocationData, street: e.target.value })
                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.street} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Küçə nömrəsi" onChange={(e) => {
                        if (Number(e.target.value) || e.target.value === '') {
                            setLocationData({ ...LocationData, streetnumber: e.target.value })
                        }
                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.streetnumber} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Yolun istiqaməti" onChange={(e) => {
                        setLocationData({ ...LocationData, direction: e.target.value })
                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.direction} />
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={6}>
                    <Input placeholder="İd" disabled value={LocationData._id} style={{ border: "1px solid black" }} />
                </Col>
                <Col span={6}>
                    <Input placeholder="Label" onChange={(e) => {
                        setLocationData({ ...LocationData, locationlabel: e.target.value })
                    }}
                        style={{ border: "1px solid black" }}
                        value={LocationData.locationlabel} />
                </Col>
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
                        <Select.Option value={true} >Aktiv</Select.Option>
                        <Select.Option value={false} >Deaktiv</Select.Option>
                    </Select>
                </Col>

            </Row>

        </Modal>
    );
};
export default LocationModal;
