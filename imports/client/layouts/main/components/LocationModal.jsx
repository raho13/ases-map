import { Button, Modal, Input, Row, Col, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Map from './Map';

const LocationModal = ({ parm }) => {
   
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                width={"80%"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Input placeholder="Tam ünvan adı" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Qısa ünvan adı" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Lat" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Long" />
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            defaultValue="Ölkə">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            defaultValue="Şəhər/rayon">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            defaultValue="Bölgə">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            defaultValue="Region">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Input placeholder="Küçə/prospekt" />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Nömrə" type='number' />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="İd" disabled value={'dgerge'} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Məhşur adı" />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col>
                        {/* <Map /> */}
                    </Col>
                </Row>
            </Modal>

        </>
    );
};
export default LocationModal;
