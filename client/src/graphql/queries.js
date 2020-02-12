export const ME_QUERY = `
{me{
  _id
  name
  email
}}
`;


export const GET_PINS_QUERY = `
  {
    getPins {
        _id
        title
        content
        image
        longitude
        latitude
    }
  }
`
export const GET_TRAILS_QUERY = `
  {
    getTrails {
        _id
        name
        description
        path
        elevation
        type
        level
    }
  }
`