import { LocationsCollection } from "./collection"

Meteor.methods({
    add_location(data) {
       // locationId = LocationsCollection.find().fetch().length
      //  readyLocation = data[locationId] = locationId
      console.log(data)
        LocationsCollection.insert(data)
        return "funksiyanin sonu"
    },
    update_location(_id,data){
        delete data._id
        const res= LocationsCollection.update({_id},{$set:data})
        return  LocationsCollection.findOne({_id})
    }
})