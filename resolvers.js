const { AuthenticationError } = require("apollo-server");


const user = {
  _id: "1",
  name: "Ivo",
  email: "ivo@sisko.com",
  picture: "picture"
};

const authenticated = next => (root, args, ctx, info) => {
  console.log("ctx", ctx);
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root,args,ctx)=>ctx.currentUser)
  }
};
