import { LocationsCollection } from "./collection";

Meteor.methods({
  //create
  add_location(data) {
    locationId = LocationsCollection.find().fetch().length;
    data.createdAt = new Date();
    data.locationId = locationId;
    LocationsCollection.insert(data);
    return "funksiyanin sonu";
  },

  //add default data
  addTons(data) {
    const editedTable=[]
  data.map((item)=>{
    const editedData = {};
    editedData.name = item.full_address,
    editedData.shortname = "",
    editedData.lat = item.lat,
    editedData.lon = item.lon,
    editedData.country = "",
    editedData.city = item.city,
    editedData.rural = "",
    editedData.district = item.district,
    editedData.village = "",
    editedData.street = "",
    editedData.streetnumber = "",
    editedData.id = "",
    editedData.locationlabel = "",
    editedData.direction ="",
    editedData.status = true,
    editedData.locationId = item.id
    editedData.createdAt = new Date();
    editedTable.push(editedData);
  })
    LocationsCollection.rawCollection().insertMany(editedTable);
    console.log('bazaya yazildi')
  },


  //update
  update_location(_id, data) {
    delete data._id;
    LocationsCollection.update({ _id }, { $set: data });
    return LocationsCollection.findOne({ _id });
  },


  //delete
  // delete_location(_id) {
  //     return LocationsCollection.remove({ _id })
  // },


  //data count
  count_locations(query) {
    return LocationsCollection.find(query, {
      fields: { _id: 1 },
    }).count();
  },



  
});
