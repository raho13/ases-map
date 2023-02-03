import { villagesCollection } from "./collection"


Meteor.methods({
    //Get
    get_villages(query, limit, skip, sort) {
        const dataSource = villagesCollection.find(query, { limit, skip, sort }).fetch()
        const total = villagesCollection.find(query, {
            fields: { _id: 1 }
        }).count();

        return { dataSource, total }
    },
    //Create
    create_village(data) {
        const total = villagesCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        villagesCollection.insert(data)
        return "elave edildi"
    },
    update_village(_id, data) {
        delete data._id
        villagesCollection.update({ _id }, { $set: data })
        return villagesCollection.findOne({ _id })
    }

})

