const User = require('../models/User')
const {OAuthClient} = require('google-auth-library')
require("dotenv").config();

const client = new OAuthClient(process.env.OAUTH_CLIENT_ID)


exports.findOrCreateUser = async token => {
    const googleUser = await verifyAuthToken(token);
    const user = await checkIfUserExists(googleUser.email);
    return user ? user : createNewUser(googleUser);
  };
  
  const verifyAuthToken = async token => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_CLIENT_ID
      });
      return ticket.getPayload();
    } catch (error) {
      console.error("Unable to verify user", error);
    }
  };
  
  const checkIfUserExists = async email => await User.findOne({ email }).exec();
  
  const createNewUser = googleUser => {
    const { name, email, picture } = googleUser;
    const user = { name, email, picture };
    return new User(user).save();
  };
  