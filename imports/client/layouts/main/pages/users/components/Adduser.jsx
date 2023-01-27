import React, { useState } from 'react'
import { Button, Modal, Input, Space, notification } from "antd";
export default function AddCity({ onAnyChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setinputValue] = React.useState({ username: "", password: "" })
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.error({
            message: "Başqa bir istifadəçi adı seçin",
            description:
                "Bu istifadəçi adı daha əvvəl istifadə olunub",
            placement,
            duration: 2
        });
    };
    const addToDb = () => {
        Meteor.call("create_user", inputValue, (err, res) => {
            if (err) {
                if (err.error === 400 || err.error === 403) {
                    openNotification('top')
                }
                // console.log(err)
            }
            else if (res) {
                onAnyChange("create_user", {})
                setIsModalOpen(false)
            }

        })
        setinputValue({})
    }

    return (
        <>
            {contextHolder}
            <Button size='large' style={{ marginBottom: 20 }} type="primary" onClick={() => {
                setIsModalOpen(true)
            }} >İstifadəçi əlavə et  </Button>

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

                <Input placeholder="İstifadəçi adı" onChange={(e) => {
                    setinputValue({ ...inputValue, username: e.target.value })
                }}
                    style={{ marginBottom: "20px" }}
                />

                <Input.Password placeholder="Şifrə" onChange={(e) => {
                    setinputValue({ ...inputValue, password: e.target.value })
                }}
                    value={inputValue.data}
                />
            </Modal>
        </>
    )
}
