const {    
    getOneCanelationOption,
    getAllCanelationOptions,
    createOneCanelationOption,
    createManyCanelationOptions,
    updateOneCanelationOption,
    deleteOneCanelationOption,
    deleteAllCanelationOptions,
    deleteManyCancelationOption
      } = require('../controller/cancelationOption')
  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')
  const {
    cancelOptionObject
  } = require('../schema/schemaContainer')
  
    const getOneCancelationOptionSchema = {
      schema: {
        response: {
          200: cancelOptionObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneCanelationOption,
    }
    
    const getAllCancelationOptionsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: cancelOptionObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:websiteMiddleware,
      handler: getAllCanelationOptions,
    }
    
    const postOneCancelationOptionSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['name','offSetMilli'],
          properties: {
            name: { type: 'string' },
            offSetMilli: { type: 'integer' },
          },
        },
        response: {
          201: cancelOptionObject,
        },
      },
      preValidation:adminMiddleware,
      handler: createOneCanelationOption,
    }
  
    const postManyCanelationOptionsSchema = {
      schema: {
        body: {
          type:'object',
          properties:{
            data:{
              type:'array',
              items:{
                required: ['name','offSetMilli'],
                type:'object',
                properties: {
                    name: { type: 'string' },
                    offSetMilli: {type:'integer'}
                },  
              }
            }
          }
        },
        response: {
          201: {
            type:'array',
            items:cancelOptionObject
          },
        },
      },
      preValidation:adminMiddleware,
      handler: createManyCanelationOptions,
    }
  
    const updateOneCancelationOptionSchema = {
      schema: {
        body:{
          type:'object',
          required: ['name','offSetMilli'],
          properties:{
            name: { type: 'string' },
            offSetMilli: { type: 'integer' },
         }
        },
        response: {
          200: cancelOptionObject,
        },
      },
      preValidation:adminMiddleware,
      handler: updateOneCanelationOption,
    }
    
    const deleteOneCanelationOptionSchema = {
      schema: {
        response: {
          200: cancelOptionObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneCanelationOption
    }
  
    const deleteAllCanelationOptionsSchema = {
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
      handler: deleteAllCanelationOptions,
    }

    const deleteManyCanelationOptionsSchema = {
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
      handler: deleteManyCancelationOption,
    }

  
    module.exports = {
        getOneCancelationOptionSchema,
        getAllCancelationOptionsSchema,
        postOneCancelationOptionSchema,
        postManyCanelationOptionsSchema,
        updateOneCancelationOptionSchema,
        deleteOneCanelationOptionSchema,
        deleteAllCanelationOptionsSchema,
        deleteManyCanelationOptionsSchema
    }