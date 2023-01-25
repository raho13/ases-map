import { StagesCollection } from "./collection"


Meteor.methods({
    //Get
    get_stages(query, limit, skip, sort) {
        const dataSource = StagesCollection.find(query, { limit, skip, sort }).fetch()
        const total = StagesCollection.find(query, {
            fields: { _id: 1 }
        }).count();

        return { dataSource, total }
    },
    //Create
    create_stage(data) {
        const total = StagesCollection.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        StagesCollection.insert(data)
        return "elave edildi"
    },
    update_stage(_id, data) {
        delete data._id
        StagesCollection.update({ _id }, { $set: data })
        return StagesCollection.findOne({ _id })
    }

})

