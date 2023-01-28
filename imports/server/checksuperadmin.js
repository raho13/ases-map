Meteor.startup(function () {
    const IsalreadyExsist = Meteor.users.findOne({ "profile.role": 1 })
    if (!IsalreadyExsist) {
        Accounts.createUser({
            username: "sadmin", password: "sadmin", profile: { role: 1, number: 1 }
        })
    }
}
)
