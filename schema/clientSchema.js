const {    
    getOneClient,
    getAllClients,
    updateOneClient,
    deleteOneClient,
    deleteAllClient
  } = require('../controller/client')
  const clientMiddleware = require('../controller/auth')
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
      handler: getOneClient,
    }
    
    const getAllClientsSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:clientObject
          },
        },
      },
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
      handler: updateOneClient,
    }
    
    const deleteOneClientSchema = {
      schema: {
        response: {
          200: clientObject
        },
      },
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
      handler: deleteAllClient,
    }
  
    module.exports = {
        getOneClientSchema,
        getAllClientsSchema,
        updateOneClientSchema,
        deleteOneClientSchema,
        deleteAllClientsSchema
    }