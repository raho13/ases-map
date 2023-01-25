import { CitiesCollection } from "./collection"
Meteor.methods({
    //Get
    get_cities(query, limit, skip, sort) {
        const dataSource = CitiesCollection.find(query, { limit, skip, sort }).fetch()
        const total = CitiesCollection.find(query, {
            fields: { _id: 1 }
        }).count();
        return { dataSource, total }
    },
    //Create
    create_city(data) {
        const total = CitiesCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        CitiesCollection.insert(data)
        return "elave edildi"
    },
    update_city(_id, data) {
        delete data._id
        CitiesCollection.update({ _id }, { $set: data })
        return CitiesCollection.findOne({ _id })
    }
})

