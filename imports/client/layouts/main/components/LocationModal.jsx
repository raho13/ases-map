import { Button, Modal, Input, Row, Col, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

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
                salam
            </Modal>

        </>
    );
};
export default LocationModal;
