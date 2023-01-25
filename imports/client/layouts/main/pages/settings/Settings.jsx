import { Menu, Table, Row, Col } from "antd"
import React from "react"
import { Regions } from "./components/Regions"
import { Stages } from "./components/Stages"
import { Cities } from "./components/Cities"
const MenuComonents = {
    Regions, Stages, Cities
}
export function Settings() {
    const [choosen_item, setChoosenItem] = React.useState("Regions")
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
                            key: "Regions",
                            label: "Regionlar",
                        },
                        {
                            key: "Stages",
                            label: "Bölgələr",
                        },
                        {
                            key: "Cities",
                            label: "Şəhərlər",
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