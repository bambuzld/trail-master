const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Query {
    me: User
  }

  type Pin {
    _id: ID
    createdAt: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    title: String
  }


  input CreatePinInput{
    title: String
    image: String
    latitude: Float
    longitude: Float,
    content: String

  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
  }
`;
