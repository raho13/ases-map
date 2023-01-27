Meteor.startup(function () {

    //Meteor.userId()
    //Meteor.user()
    //yaradacigim userin icind olamilidir 
    // username
    // psw
    const IsalreadyExsist = Meteor.users.findOne({ "profile.role": 1 })
    if (!IsalreadyExsist) {
        Accounts.createUser({
            username: "sadmin", password: "sadmin", profile: { role: 1, number: 1 }
        })
    }
}
)


//Meteor.users
//users collection
