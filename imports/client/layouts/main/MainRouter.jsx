import React from 'react'
import Locations from './pages/locations/Locations'
import  {Settings}  from './pages/settings/Settings';

export default function MainRouter({ path }) {
    switch (path) {
        case "/locations":
            return <Locations />
            break;
        case "/settings":
            return <Settings />;
            break;
        default:
            break;
    }
}
