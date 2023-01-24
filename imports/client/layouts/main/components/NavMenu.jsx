import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import React from 'react'


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Ünvanlar', 'lll'),
    getItem('İstifadəçilər'),
    getItem('Settings'),
];
const NavMenu = () => {
    return (
        <Menu
            style={{
                maxWidth: "100%",
            }}
            // theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default NavMenu;