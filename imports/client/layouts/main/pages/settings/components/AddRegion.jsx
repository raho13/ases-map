import React, { useState } from 'react'
import { Button, Modal, Input, Space } from "antd";
export default function AddRegion({ onAnyChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setinputValue] = useState({})
    const showModal = () => {
        setIsModalOpen(true);
    };
    const addToDb = () => {
        Meteor.call("create_region", inputValue, (err, res) => {
            if (err) {
                console.log(err)
            }
            else if (res) {
                onAnyChange("create_region", {})
                setIsModalOpen(false)
            }

        })
        setinputValue({})
    }

    return (
        <>

            <Button size='large' style={{ marginBottom: 20 }} type="primary" onClick={() => {
                setIsModalOpen(true)
            }} >Region əlavə et  </Button>

            <Modal
                title="Əlavə et"
                width={"40%"}
                open={isModalOpen}
                onOk={addToDb}
                okText="Əlavə et"
                cancelText="Ləğv et"
                type="warning"
                onCancel={() => {
                    setIsModalOpen(false)
                }}>
                <Input placeholder="Region adı" onChange={(e) => {
                    setinputValue({ ...inputValue, data: e.target.value })
                }}
                    value={inputValue.data} />
            </Modal>
        </>
    )
}
