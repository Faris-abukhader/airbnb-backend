const {    
    getOneAmenity,
    getAllAmenities,
    createOneAmenity,
    createManyAmenities,
    updateOneAmenity,
    deleteOneAmenity,
    deleteAllAmenities
      } = require('../controller/amenity')
  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')
  const {
    amenityObject
  } = require('../schema/schemaContainer')
  
    const getOneAmenitySchema = {
      schema: {
        response: {
          200: amenityObject,
        },
      },
      preValidation:websiteMiddleware,
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
      preValidation:websiteMiddleware,
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
      preValidation:adminMiddleware,
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
      preValidation:adminMiddleware,
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
      preValidation:adminMiddleware,
      handler: updateOneAmenity,
    }
    
    const deleteOneAmenitySchema = {
      schema: {
        response: {
          200: amenityObject
        },
      },
      preValidation:adminMiddleware,
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
      preValidation:adminMiddleware,
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