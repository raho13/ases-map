import { Menu } from 'antd';
import React from 'react'
import { useNavigate } from "react-router-dom";

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
    getItem('Ünvanlar', 'locations'),
    getItem('İstifadəçilər', 'users'),
    getItem('Settings', 'settings'),
];
const NavMenu = () => {
    const navigate = useNavigate()
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
            onClick={(e) => {
                navigate(`/${e.key}`);
            }}
        />
    );
};
export default NavMenu;