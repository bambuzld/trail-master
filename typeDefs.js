const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
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

  type Feature {
    id: ID
    type: String
    properties: Property
    geometry: Geometry
  }

  input FeatureInput {
    id: ID
    type: String
    properties: PropertyInput
    geometry: GeometryInput
  }

  type Property {
    name: String
  }

  type Geometry {
    type: String
    coordinates: [[Float]]
  }
  input PropertyInput {
    name:  String
  }

  input GeometryInput {
    type: String
    coordinates: [[Float]]
  }

  type GeoJSON {
    type: String
    features: [Feature]
  }
  input GeoJSONInput {
    type: String
    features: [FeatureInput]
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
    geoJson: GeoJSON
  }

  input CreatePinInput {
    title: String
    image: String
    latitude: Float
    longitude: Float
    content: String
  }
  input CreateTrailInput {
    name: String
    description: String
    level: String
    type: String
    path: [[Float]]
    elevation: [Float]
    geoJson: GeoJSONInput!
  }

  type Query {
    me: User
    getPins: [Pin!]
    getTrails: [Trail!]
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    createTrail(input: CreateTrailInput!): Trail
  }
`;
