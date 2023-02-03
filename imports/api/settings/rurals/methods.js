import { RuralsCollection } from "./collection"
Meteor.methods({
    //Get
    get_rurals(query, limit, skip, sort) {
        const dataSource = RuralsCollection.find(query, { limit, skip, sort }).fetch()
        const total = RuralsCollection.find(query, {
            fields: { _id: 1 }
        }).count();
        return { dataSource, total }
    },
    //Create
    create_rural(data) {
        const total = RuralsCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        RuralsCollection.insert(data)
        return "elave edildi"
    },
    update_rural(_id, data) {
        delete data._id
        RuralsCollection.update({ _id }, { $set: data })
        return RuralsCollection.findOne({ _id })
    }
})

