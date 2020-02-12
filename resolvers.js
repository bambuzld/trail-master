const { AuthenticationError } = require("apollo-server");
const Pin = require('./models/Pin')
const Trail = require('./models/Trail')



const authenticated = next => (root, args, ctx, info) => {
  console.log("ctx", ctx);
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root,args,ctx)=>ctx.currentUser),
    getPins: async (root,args,ctx)=>{
     const pins =  await Pin.find({}).populate('author').populate('comments.author')
     return pins
    },
    getTrails: async (root,args,ctx)=>{
      const trails = await Trail.find({}).populate('author')
      return trails
    }
  },
  Mutation: {
    createPin: authenticated(async (root,args,ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save()

      const pinAdded = await Pin.populate(newPin,'author')
      return pinAdded
    }),
    createTrail: async(root,args,ctx)=>{
      const newTrail = await new Trail({
        ...args.input,
      }).save()

      const trailAdded = await Trail.populate(newTrail, 'author')
      return trailAdded
    }
  },
  // Mutation: {
  //   createPin: async (root,args,ctx) => {
  //     const newPin = await new Pin({
  //       ...args.input,
  //       // author: ctx.currentUser._id
  //     }).save()

  //     const pinAdded = await Pin.populate(newPin)
  //     return pinAdded
  //   } 
  // }
};
