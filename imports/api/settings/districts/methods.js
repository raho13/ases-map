import { districtsCollection } from "./collection"


Meteor.methods({
    //Get
    get_districts(query, limit, skip, sort) {
        const dataSource = districtsCollection.find(query, { limit, skip, sort }).fetch()
        const total = districtsCollection.find(query, {
            fields: { _id: 1 }
        }).count();

        return { dataSource, total }
    },
    //Create
    create_district(data) {
        const total = districtsCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        districtsCollection.insert(data)
        return "elave edildi"
    },
    update_district(_id, data) {
        delete data._id
        districtsCollection.update({ _id }, { $set: data })
        return districtsCollection.findOne({ _id })
    }

})

