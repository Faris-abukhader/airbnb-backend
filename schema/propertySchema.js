const {
  getOneProperty,
  getAllProperties,
  searchOneProperty,
  updateOneProperty,
  postOneProperty,
  deleteOneProperty,
  approveProperty,
  disapproveProperty
} = require('../controller/property')
const clientMiddleware = require('../controller/auth')
const fastify = require('fastify')()

const {
  propertyObject,
  staffObject,
  approvePropertyObject
} = require('../schema/schemaContainer')

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
  handler: getAllProperties
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
  handler: deleteOneProperty
}



module.exports = {
  getAllPropertiesSchema,
  searchPropertySchema,
  postOnePropertySchema,
  approvePropertySchema,
  disapprovePropertySchema,
  deleteOnePropertySchema,
  updateOnePropertySchema
}