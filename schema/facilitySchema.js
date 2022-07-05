const {    
    getOneFacility,
    getAllFacilities,
    createOneFacility,
    createManyFacilities,
    updateOneFacility,
    deleteOneFacility,
    deleteAllFacilities
      } = require('../controller/facility')
  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')
  const fastify = require('fastify')()

  const {
    facilityObject
  } = require('../schema/schemaContainer')
    
    const getOneFacilitySchema = {
      schema: {
        response: {
          200: facilityObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneFacility,
    }
    
    const getAllFacilitiesSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:facilityObject
          },
        },
      },
      preValidation:websiteMiddleware,
      handler: getAllFacilities,
    }
    
    const postOneFacilitySchema = {
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
          201: facilityObject,
        },
      },
      preValidation:adminMiddleware,
      handler: createOneFacility,
    }
  
    const postManyFacilitiesSchema = {
      schema: {
        body: {
          type: 'array',
          items:{
            required: ['name'],
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
            items:facilityObject
          },
        },
      },
      preValidation:adminMiddleware,
      handler: createManyFacilities,
    }
  
    const updateFacilitySchema = {
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
          200: facilityObject,
        },
      },
      preValidation:adminMiddleware,
      handler: updateOneFacility,
    }
    
    const deleteOneFacilitySchema = {
      schema: {
        response: {
          200: facilityObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneFacility
    }
  
    const deleteAllFacilitiesSchema = {
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
      handler: deleteAllFacilities,
    }
  
    module.exports = {
        getOneFacilitySchema,
        getAllFacilitiesSchema,
        postOneFacilitySchema,
        postManyFacilitiesSchema,
        updateFacilitySchema,
        deleteOneFacilitySchema,
        deleteAllFacilitiesSchema,
    }