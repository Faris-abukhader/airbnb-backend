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

const user = {
    type: 'object',
    properties: {
      id:{type:'integer'},
      email: { type: 'string' },
      password:{type:'string'},
      role:{type:'string'}
    },
  }

  const getAllUsersSchema = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: user,
        },
      },
    },
    // preValidation:clientMiddleware,
    handler: getAllUsers,
  }
  
  const getOneUserSchema = {
    schema: {
      response: {
        200: user,
      },
    },
    handler: getOneUser,
  }
  
  const postOneUserSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['email','password','firstName','secondName','image'],
        properties: {
          name: { type: 'string' },
        },
      },
      response: {
        201: user,
      },
    },
    handler: postOneUser,
  }

  const updateOneUserSchema = {
    schema: {
      response: {
        200: user,
      },
    },
    handler: updateOneUser,
  }
  
  
  
  const deleteOneUserSchema = {
    schema: {
      response: {
        200: {
          type: 'object',
          item: user
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