import { Button, Modal, Input, Row, Col, Select } from 'antd';
import React, { useEffect } from 'react';



const LocationModal = ({ resetData, setIsModalOpen, LocationData, setLocationData, isModalOpen }) => {
    const [query, setQuery] = React.useState({});
    const [sort, setSort] = React.useState({ createdAt: -1 })
    const [limit, setLimit] = React.useState(0);
    const [skip, setSkip] = React.useState(0);
    const [regions, setregions] = React.useState([])
    const [stages, setstages] = React.useState([])
    const [cities, setcities] = React.useState([])
    useEffect(() => {
        Meteor.call("get_regions", query, limit, skip, sort, function (err, res) {
            if (res) {
                setregions(res.dataSource)
            } else {
                console.log(err)
            }
        })
        Meteor.call("get_stages", query, limit, skip, sort, function (err, res) {
            if (res) {
                setstages(res.dataSource)
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
                            setLocationData({ ...LocationData, stage: e })
                        }}
                        style={{
                            width: '100%',
                        }}
                        value={LocationData.stage === "" ? 'Bölgə' : LocationData.stage} >

                        {stages.map((stage) => {
                            return <Select.Option key={stage._id} value={stage.data}>{stage.data}</Select.Option>
                        })}
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
                        {regions.map((region) => {
                            return <Select.Option key={region._id} value={region.data}>{region.data}</Select.Option>
                        })}
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
                        <Select.Option value={true} >Aktiv</Select.Option>
                        <Select.Option value={false} >Deaktiv</Select.Option>
                    </Select>
                </Col>

            </Row>

        </Modal>
    );
};
export default LocationModal;
