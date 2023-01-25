import { LocationsCollection } from "./collection"

Meteor.methods({
    //create
    add_location(data) {
        locationId = LocationsCollection.find().fetch().length
        data.createdAt = new Date()
        data.locationId = locationId
        LocationsCollection.insert(data)
        return "funksiyanin sonu"
    },
    //update
    update_location(_id, data) {
        delete data._id
        LocationsCollection.update({ _id }, { $set: data })
        return LocationsCollection.findOne({ _id })
    },
    //delete
    // delete_location(_id) {
    //     return LocationsCollection.remove({ _id })
    // },
    //data count
    count_locations(query) {
        return LocationsCollection.find(query, {
            fields: { _id: 1 }
        }).count();
    }
})