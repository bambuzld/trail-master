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