const {    
    getOneAmenity,
    getAllAmenities,
    createOneAmenity,
    createManyAmenities,
    updateOneAmenity,
    deleteOneAmenity,
    deleteAllAmenities
      } = require('../controller/amenity')
  const clientMiddleware = require('../controller/auth')
  const fastify = require('fastify')()
  const {
    amenityObject
  } = require('../schema/schemaContainer')
  
    const getOneAmenitySchema = {
      schema: {
        response: {
          200: amenityObject,
        },
      },
      handler: getOneAmenity,
    }
    
    const getAllAmenitiesSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:amenityObject
          },
        },
      },
      handler: getAllAmenities,
    }
    
    const postOneAmenitySchema = {
      schema: {
        body: {
          type: 'object',
          required: ['name','icon'],
          properties: {
            name: { type: 'string' },
            icon: { type: 'string' },
          },
        },
        response: {
          201: amenityObject,
        },
      },
      handler: createOneAmenity,
    }
  
    const postManyAmenitiesSchema = {
      schema: {
        body: {
          type: 'array',
          items:{
            required: ['name','icon'],
            type:'object',
            properties: {
                name: { type: 'string' },
                icon: { type: 'string' },
            },  
          }
        },
        response: {
          201: {
            type:'array',
            items:amenityObject
          },
        },
      },
      handler: createManyAmenities,
    }
  
    const updateAmenitySchema = {
      schema: {
        body:{
          type:'object',
          required: ['name','icon'],
          properties:{
            name: { type: 'string' },
            icon: { type: 'string' },
         }
        },
        response: {
          200: amenityObject,
        },
      },
      handler: updateOneAmenity,
    }
    
    const deleteOneAmenitySchema = {
      schema: {
        response: {
          200: amenityObject
        },
      },
      handler: deleteOneAmenity
    }
  
    const deleteAllAmenitiesSchema = {
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
      handler: deleteAllAmenities,
    }
  
    module.exports = {
        getOneAmenitySchema,
        getAllAmenitiesSchema,
        postOneAmenitySchema,
        postManyAmenitiesSchema,
        updateAmenitySchema,
        deleteOneAmenitySchema,
        deleteAllAmenitiesSchema,
    }