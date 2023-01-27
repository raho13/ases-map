import React from 'react'
import { Button, Dropdown, Divider } from 'antd';

import { CgProfile } from 'react-icons/cg'


function onLogout() {
    Meteor.logout()
}

export function Header() {
    const items = [
        {
            key: '1',
            label: (
                <Button className='w-full' size='small' type='danger' onClick={onLogout} >
                    Hesabdan çıx
                </Button>
            ),
        },

    ];



    return (


        <div style={{ width: '100%', display: "flex", flexDirection: 'row-reverse' }}>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
                arrow
                size="small"
            >
                <Button size="small" > <CgProfile />{Meteor.user().username}</Button>
            </Dropdown>
        </div>


    )
}