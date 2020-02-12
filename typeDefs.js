const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Query {
    me: User,
    getPins: [Pin!]
    getTrails: [Trail!]
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

  type Trail {
    _id: ID
    name: String
    description: String
    type: String
    length: String
    path: [[Float]]
    elevation: [Float]
    level: String
  }


  input CreatePinInput{
    title: String
    image: String
    latitude: Float
    longitude: Float
    content: String

  }
  input CreateTrailInput{
    name: String
    description: String
    level: String
    type: String
    path: [[Float]]
    elevation: [Float]

  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    createTrail(input: CreateTrailInput!): Trail
  }
`;
