const ROLES = {
    TYPES: {
        ADMIN: {
            value: 1,
            name: "Admin",
        },

    },
    ARR:[],
}
export function isUser(type,user=Meteor.user()){
    const user_role_value=user?.profile?.role
    return ROLES.TYPES[type].value===user_role_value
}
Object.keys(ROLES.TYPES).map(TYPE => {
    ROLES.ARR.push(ROLES.TYPES[TYPE])
    ROLES[ROLES.TYPES[TYPE].value] = ROLES.TYPES[TYPE]
})
export default ROLES