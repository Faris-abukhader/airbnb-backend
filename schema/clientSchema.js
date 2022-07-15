const {    
    getOneClient,
    getAllClients,
    updateOneClient,
    deleteOneClient,
    deleteAllClient
  } = require('../controller/client')
  const adminMiddleware = require('../prevalidation/admin')
  const clientMiddleware = require('../prevalidation/client')
  const fastify = require('fastify')()

  const {
    clientObject
  } = require('../schema/schemaContainer')

  
    const getOneClientSchema = {
      schema: {
        response: {
          200: clientObject,
        },
      },
      preValidation:clientMiddleware,
      handler: getOneClient,
    }
    
    const getAllClientsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: clientObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:adminMiddleware,
      handler: getAllClients,
    }
      
    const updateOneClientSchema = {
      schema: {
        body:{
          type:'object',
          required:['firstName','secondName','image'],
          properties:{
            firstName:{type:'string'},
            secondName:{type:'string'},
            image:{type:'string'}
          }
        },
        response: {
          200: clientObject,
        },
      },
      preValidation:clientMiddleware,
      handler: updateOneClient,
    }
    
    const deleteOneClientSchema = {
      schema: {
        response: {
          200: clientObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneClient
    }
  
    const deleteAllClientsSchema = {
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
      handler: deleteAllClient,
    }
  
    module.exports = {
        getOneClientSchema,
        getAllClientsSchema,
        updateOneClientSchema,
        deleteOneClientSchema,
        deleteAllClientsSchema
    }