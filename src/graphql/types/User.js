export default `
    scalar Date
    type User {
        _id: String!
        firstName: String!
        lastName: String!
        email: String!
        role: String!
        password: String!
        createdAt: Date!
        lastLogin: Date!
    }
    type Query {
        user(_id: String!): User
        users: [User]
        currentUser: User
    }
    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, role: String!, password: String!): String
        login(email: String!, password: String!): String
        deleteUser(_id: String!): User
        editUser(_id: String!, firstName: String!, lastName: String!, password: String!): User
    }
`
