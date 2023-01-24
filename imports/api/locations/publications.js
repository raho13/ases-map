import { LocationsCollection } from "./collection";

Meteor.publish('get_locations', function() {
    return LocationsCollection.find();
 })