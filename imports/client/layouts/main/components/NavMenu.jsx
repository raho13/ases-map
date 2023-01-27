import { Menu } from 'antd';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const NavMenu = () => {
    const userRole = useTracker(() => {
        const result = {}
        result.ready = Meteor.user().profile.role
        return result;
    }, [Meteor.user()._id])

    const InitItem = () => {
        if (userRole.ready === 1) {
            return items = [
                getItem('Ünvanlar', 'locations'),
                getItem('İstifadəçilər', 'users'),
                getItem('Settings', 'settings'),
            ];
        } else {
            return items = [
                getItem('Ünvanlar', 'locations'),
            ];
        }
    }

    const items1 = [
        getItem('Ünvanlar', 'locations')
    ];
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
            items={InitItem()}
            onClick={(e) => {
                navigate(`/${e.key}`);
            }}
        />
    );
};
export default NavMenu;