import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import Locations from './layouts/main/pages/locations/Locations'

export default function ProtectedRoutse({ children }) {
    const userRole = useTracker(() => {
        const result = {}
        result.ready = Meteor.user().profile.role
        return result;
    }, [Meteor.user()._id])

    if (userRole.ready === 1) {
        return (
            <>{children}</>
        )
    }
    else {
        window.location.pathname = "/locations"
        return <Locations />
    }

}
