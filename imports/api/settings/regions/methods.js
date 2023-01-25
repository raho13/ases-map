import { RegionsCollection } from "./collection"


Meteor.methods({
    //Get
    get_regions(query, limit, skip, sort) {
        const dataSource = RegionsCollection.find(query, { limit, skip, sort }).fetch()
        const total = RegionsCollection.find(query, {
            fields: { _id: 1 }
        }).count();

        return { dataSource, total }
    },
    //Create
    create_region(data) {
        const total = RegionsCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        RegionsCollection.insert(data)
        return "elave edildi"
    },
    update_region(_id, data) {
        delete data._id
        RegionsCollection.update({ _id }, { $set: data })
        return RegionsCollection.findOne({ _id })
    }

})

