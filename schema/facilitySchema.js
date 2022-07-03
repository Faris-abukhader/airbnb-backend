const {    
    getOneFacility,
    getAllFacilities,
    createOneFacility,
    createManyFacilities,
    updateOneFacility,
    deleteOneFacility,
    deleteAllFacilities
      } = require('../controller/facility')
  const clientMiddleware = require('../controller/auth')
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
      handler: updateOneFacility,
    }
    
    const deleteOneFacilitySchema = {
      schema: {
        response: {
          200: facilityObject
        },
      },
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