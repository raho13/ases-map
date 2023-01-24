import { LocationsCollection } from "./collection";

Meteor.publish('get_locations', function (query, limit, skip, sort) {
    return LocationsCollection.find(query, {
        sort, skip, limit
    });
})