const {
  getAllUsers,
  getOneUser,
  postOneUser,
  postUser,
  updateOneUser,
  deleteOneUser,
  deleteAllUsers,
  deleteManyUsers
} = require('../controller/user')
const adminMiddleware = require('../prevalidation/admin')
const websiteMiddleware = require('../prevalidation/website')

const {
  userObject, clientObject
} = require('../schema/schemaContainer')


  const getAllUsersSchema = {
    schema: {
      response: {
        200:
        {
          type: 'object',
          properties: {
            data:{
              type: 'array',
              item: userObject,
            },          
            pageNumber: { type: 'integer' },
          }
        }
      },
    },
    preValidation:adminMiddleware,
    handler: getAllUsers,
  }
  
  const getOneUserSchema = {
    schema: {
      response: {
        200: userObject,
      },
    },
    preValidation:websiteMiddleware,
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
        201: {
          type: 'object',
          properties: {
            id:  {type:'integer'},
            email: { type: 'string' },
            firstName: { type: 'string' },
            secondName: { type: 'string' },
            image: { type: 'string' },
            createdAt: { type: 'string' },
            lastUpdate: { type: 'string' },
          },  
        },
      },
    },
    preValidation:websiteMiddleware,
    handler: postOneUser,
  }



  const postUserSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['email','firstName','secondName','role','image'],
        properties: {
          email: { type: 'string' },
          firstName: { type: 'string' },
          secondName: { type: 'string' },
          role: { type: 'string' },
          image: { type: 'string' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id:  {type:'integer'},
            email: { type: 'string' },
            firstName: { type: 'string' },
            secondName: { type: 'string' },
            image: { type: 'string' },
            role: { type: 'string' },
            createdAt: { type: 'string' },
            lastUpdate: { type: 'string' },
          },  
        },
      },
    },
    preValidation:adminMiddleware,
    handler: postUser,
  }

  const updateOneUserSchema = {
    schema: {
      response: {
        200: userObject,
      },
    },
    preValidation:websiteMiddleware,
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
    preValidation:adminMiddleware,
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
   preValidation:adminMiddleware,
   handler: deleteAllUsers,
  }


  const deleteManyUsersSchema = {
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
   preValidation:adminMiddleware,
   handler: deleteManyUsers,
  }

  module.exports = {
    getOneUserSchema,
    getAllUsersSchema,
    postOneUserSchema,
    postUserSchema,
    updateOneUserSchema,
    deleteOneUserSchema,
    deleteAllUsersSchema,
    deleteManyUsersSchema
  }