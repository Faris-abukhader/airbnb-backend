const {    
    getOneFacility,
    getAllFacilities,
    createOneFacility,
    createManyFacilities,
    updateOneFacility,
    deleteOneFacility,
    deleteAllFacilities,
    deleteManyFacilities
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
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: facilityObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
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
          type:'object',
          properties:{
            data:{
              type:'array',
              items:{
                required: ['name','icon'],
                type:'object',
                properties: {
                    name: { type: 'string' },
                    icon: { type: 'string'}
                },  
              }
            }
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

    const deleteManyFacilitiesSchema = {
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
      handler: deleteManyFacilities,
    }

  
    module.exports = {
        getOneFacilitySchema,
        getAllFacilitiesSchema,
        postOneFacilitySchema,
        postManyFacilitiesSchema,
        updateFacilitySchema,
        deleteOneFacilitySchema,
        deleteAllFacilitiesSchema,
        deleteManyFacilitiesSchema
    }