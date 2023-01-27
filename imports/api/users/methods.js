Meteor.methods({
    //Get
    get_users(query, limit, skip, sort) {
        const dataSource = Meteor.users.find(query, { limit, skip, sort }).fetch()
        const total = Meteor.users.find(query, {
            fields: { _id: 1 }
        }).count();
        return { dataSource, total }
    },
    //Create
    create_user(data) {
        const total = Meteor.users.find().fetch().length + 1;
        data.number = total
        data.createdAt = new Date()
        Accounts.createUser({
            username: data.username, password: data.password, profile: { role: 2, number: total }
        })
        return "elave edildi"
    },
    //Update
    update_username(_id, data) {
        delete data._id
        Meteor.users.update({ _id }, { $set: { username: data } })
        return Meteor.users.findOne({ _id })
    },
    setPassword(_id, data) {
         Accounts.setPassword(_id, data)
         return Meteor.users.findOne({ _id })
    }
})

