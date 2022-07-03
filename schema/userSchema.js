const {
  getAllUsers,
  getOneUser,
  postOneUser,
  updateOneUser,
  deleteOneUser,
  deleteAllUsers,
} = require('../controller/user')
const clientMiddleware = require('../controller/auth')
const fastify = require('fastify')()

const {
  userObject
} = require('../schema/schemaContainer')


  const getAllUsersSchema = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: userObject,
        },
      },
    },
    // preValidation:clientMiddleware,
    handler: getAllUsers,
  }
  
  const getOneUserSchema = {
    schema: {
      response: {
        200: userObject,
      },
    },
    handler: getOneUser,
  }
  
  const postOneUserSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['email','firstName','secondName','image'],
        properties: {
          email: { type: 'string' },
          firstName: { type: 'string' },
          secondName: { type: 'string' },
          image: { type: 'string' },
        },
      },
      response: {
        201: userObject,
      },
    },
    handler: postOneUser,
  }

  const updateOneUserSchema = {
    schema: {
      response: {
        200: userObject,
      },
    },
    handler: updateOneUser,
  }
  
  
  
  const deleteOneUserSchema = {
    schema: {
      response: {
        200: {
          type: 'object',
          item: userObject
        },
      },
    },
    handler: deleteOneUser,
  }


  const deleteAllUsersSchema = {
    schema: {
      response: {
        200:{
          type:'object',
          properties:{
            count:{type:'integer'},
          }  
        },
      },
    },
  handler: deleteAllUsers,
  }

  module.exports = {
    getOneUserSchema,
    getAllUsersSchema,
    postOneUserSchema,
    updateOneUserSchema,
    deleteOneUserSchema,
    deleteAllUsersSchema
  }