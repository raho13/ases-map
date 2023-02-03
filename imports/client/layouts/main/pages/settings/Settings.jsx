import { Menu, Table, Row, Col } from "antd"
import React from "react"
import { Villages } from "./components/Villages"
import { Districts } from "./components/Districts"
import { Cities } from "./components/Cities"
import { Rurals } from "./components/Rurals"
const MenuComonents = {
    Villages, Districts, Cities, Rurals
}
export function Settings() {
    const [choosen_item, setChoosenItem] = React.useState("Villages")
    const MenuItem = MenuComonents[choosen_item]
    return <div className="flex flex-row">
        <Row>
            <Col span={4}>
                <Menu
                    onClick={(e) => {
                        setChoosenItem(e.key)
                    }}
                    defaultSelectedKeys={[choosen_item]}
                    className="w-full"
                    mode="inline"
                    items={[
                        {
                            key: "Villages",
                            label: "Qəsəbələr",
                        },
                        {
                            key: "Districts",
                            label: "Rayonlar",
                        },
                        {
                            key: "Cities",
                            label: "Şəhərlər",
                        },
                        {
                            key: "Rurals",
                            label: "Kəndlər",
                        },

                    ]}
                />

            </Col>
            <Col span={20}>
                <MenuItem />
            </Col>

        </Row >
    </div>
}