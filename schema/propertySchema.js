const {
  getOneProperty,
  getAllProperties,
  getAllApprovedProperties,
  searchOneProperty,
  updateOneProperty,
  postOneProperty,
  deleteOneProperty,
  approveProperty,
  disapproveProperty
} = require('../controller/property')
const adminMiddleware = require('../prevalidation/admin')
const clientMiddleware = require('../prevalidation/client')
const staffMiddleware = require('../prevalidation/staff')
const websiteMiddleware = require('../prevalidation/website')
const fastify = require('fastify')()

const {
  propertyObject,
} = require('../schema/schemaContainer')

const getOnePropertySchema = {
  schema: {
    response: {
      201:propertyObject
    },
  },
  preValidation:websiteMiddleware,
  handler: getOneProperty
}

const postOnePropertySchema = {
  schema: {
    body: {
      propertyObject
    },
    required: ['name', "ownerId", "name", 'country', 'city', 'address', 'street', 'zipCode',
      'numberOFSofa', 'space', 'cancellationPolicy', 'guestArrive', 'guestDepart',
      'canSmoke', 'canHaveChildren', 'acceptPet', 'acceptForeigner', 'price', 'currency',
      'hasParking', 'hasBreakfast', 'ContactPersonName', 'countryCode', 'phoneNumber',
      'numberOfBedroom', 'numberOfBathroom', 'numberOfLivingroom', 'type',
      'images', 'languages', 'bedOptions', 'amenities', 'facilities'],
    response: {
      201:propertyObject
      ,
    },
  },
  preValidation:clientMiddleware,
  handler: postOneProperty,
}

const approvePropertySchema = {
  schema:{  
    response: {
      200:{
        type:'object',
        properties:{
            id: { type: 'integer' },
            propertyId: { type: 'integer' },
            staffId: { type: 'integer' },
            isApproved: { type: 'integer' },
            approvedDate: { type: 'string' },
            isRefused: { type: 'integer' },
            reasonOfRefused: { type: 'string' },
            dateOfRefused: { type: 'string' },
            createdAt: { type: 'string' },
            lastUpdate: { type: 'string' },
        }
      }  
    },  
  },
  preValidation:staffMiddleware,
  handler: approveProperty
}

const disapprovePropertySchema = {
  schema:{  
    response: {
      200:{
        type:'object',
        properties:{
            id: { type: 'integer' },
            propertyId: { type: 'integer' },
            staffId: { type: 'integer' },
            isApproved: { type: 'integer' },
            approvedDate: { type: 'string' },
            isRefused: { type: 'integer' },
            reasonOfRefused: { type: 'string' },
            dateOfRefused: { type: 'string' },
            createdAt: { type: 'string' },
            lastUpdate: { type: 'string' },
        }
      }  
    },  
  },
  preValidation:staffMiddleware,
  handler: disapproveProperty
}

const getAllPropertiesSchema = {
  schema: {
    response: {
      200:
      {
        type: 'object',
        properties: {
          data:{
            type: 'array',
            item: propertyObject,
          },          
          pageNumber: { type: 'integer' },
        }
      }
    },
  },
  preValidation:adminMiddleware,
  handler: getAllProperties
}

const getAllApprovedPropertiesSchema = {
  schema: {
    response: {
      200:
      {
        type: 'object',
        properties: {
          data:{
            type: 'array',
            item: propertyObject,
          },          
          pageNumber: { type: 'integer' },
        }
      }
    },
  },
  preValidation:websiteMiddleware,
  handler: getAllApprovedProperties
}

const searchPropertySchema = {
  schema: {
    description: 'post some data',
    response: {
      200:
      {
        type: 'object',
        properties: {
          data:{
            type: 'array',
            item: propertyObject,
          },          
          pageNumber: { type: 'integer' },
        }
      }
    },
  },
  preValidation:websiteMiddleware,
  handler: searchOneProperty
}

const updateOnePropertySchema = {
  schema: {
    body: {
      propertyObject
    },
    required: [ "name", 'country', 'city', 'address', 'street', 'zipCode',
      'numberOFSofa', 'space', 'cancellationPolicy', 'guestArrive', 'guestDepart',
      'canSmoke', 'canHaveChildren', 'acceptPet', 'acceptForeigner', 'price', 'currency',
      'hasParking', 'hasBreakfast', 'ContactPersonName', 'countryCode', 'phoneNumber',
      'numberOfBedroom', 'numberOfBathroom', 'numberOfLivingroom', 'type',
      'images', 'languages', 'bedOptions', 'amenities', 'facilities'],
    description: 'no need at provide [approve] object',
    response: {
      200:propertyObject
    },
  },
  preValidation:clientMiddleware,
  handler: updateOneProperty
}

const deleteOnePropertySchema = {
  schema: {
    body: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        }
        ,
        required: ['id']
      }
    },
    response: {
      200: propertyObject
    },
  },
  preValidation:clientMiddleware,
  handler: deleteOneProperty
}



module.exports = {
  getOnePropertySchema,
  getAllPropertiesSchema,
  getAllApprovedPropertiesSchema,
  searchPropertySchema,
  postOnePropertySchema,
  approvePropertySchema,
  disapprovePropertySchema,
  deleteOnePropertySchema,
  updateOnePropertySchema
}