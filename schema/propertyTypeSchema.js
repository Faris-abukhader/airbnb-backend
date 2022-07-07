const {    
    getOneType,
    getAllTypes,
    createOneType,
    createManyTypes,
    updateOneType,
    deleteOneType,
    deleteAllTypes
      } = require('../controller/propertyType')
  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')
  const {
    propertyTypeObject
  } = require('../schema/schemaContainer')
  
    const getOnePropertyTypeSchema = {
      schema: {
        response: {
          200: propertyTypeObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneType,
    }
    
    const getAllPropertyTypesSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:propertyTypeObject
          },
        },
      },
      preValidation:websiteMiddleware,
      handler: getAllTypes,
    }
    
    const postOnePropertyTypeSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
        response: {
          201: propertyTypeObject,
        },
      },
      preValidation:adminMiddleware,
      handler: createOneType,
    }
  
    const postManyPropertyTypesSchema = {
      schema: {
        body: {
          type: 'object',
          properties:{
              "data":{
                  type:'array',
                  items:propertyTypeObject
              }
          }
        },
        response: {
          201: {
            type:'array',
            items:propertyTypeObject
          },
        },
      },
      preValidation:adminMiddleware,
      handler: createManyTypes,
    }
  
    const updatePropertyTypeSchema = {
      schema: {
        body:{
          type:'object',
          required: ['name'],
          properties:{
            name: { type: 'string' },
         }
        },
        response: {
          200: propertyTypeObject
        },
      },
      preValidation:adminMiddleware,
      handler: updateOneType,
    }
    
    const deleteOnePropertyTypeSchema = {
      schema: {
        response: {
          200: propertyTypeObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneType
    }
  
    const deleteAllPropertyTypesSchema = {
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
      handler: deleteAllTypes,
    }
  
    module.exports = {
        getOnePropertyTypeSchema,
        getAllPropertyTypesSchema,
        postOnePropertyTypeSchema,
        postManyPropertyTypesSchema,
        updatePropertyTypeSchema,
        deleteOnePropertyTypeSchema,
        deleteAllPropertyTypesSchema,
    }