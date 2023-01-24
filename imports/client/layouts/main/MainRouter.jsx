import React from 'react'
import Locations from './pages/Locations'
import Test from './pages/test'

export default function MainRouter({ path }) {
    switch (path) {
        case "/":
            return <Locations />
            break;
        case "/test":
            return <Test />
            break;
        default:
            break;
    }
}
