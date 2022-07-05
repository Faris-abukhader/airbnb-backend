const {    
    getOneLanguage,
    getAllLanguages,
    createOneLanguage,
    createManyLanguages,
    updateOneLanguage,
    deleteOneLanguage,
    deleteAllLanguages
  } = require('../controller/language')
  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')

  const {
    languageObject
  } = require('../schema/schemaContainer')
    
    const getOneLanguageSchema = {
      schema: {
        response: {
          200: languageObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneLanguage,
    }
    
    const getAllLanguagesSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:languageObject
          },
        },
      },
      preValidation:websiteMiddleware,
      handler: getAllLanguages,
    }
    
    const postOneLanguageSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
        response: {
          201: languageObject,
        },
      },
      preValidation:adminMiddleware,
      handler: createOneLanguage,
    }
  
    const postManyLanguageSchema = {
      schema: {
        body: {
          type: 'array',
          items:{
            required: ['name'],
            type:'object',
            properties: {
                name: { type: 'integer' },
                },  
          }
        },
        response: {
          201: {
            type:'array',
            items:languageObject
          },
        },
      },
      preValidation:adminMiddleware,
      handler: createManyLanguages,
    }
  
    const updateLanguageSchema = {
      schema: {
        body:{
          type:'object',
          required: ['name'],
          properties:{
            name: { type: 'string' },
         }
        },
        response: {
          200: languageObject,
        },
      },
      preValidation:adminMiddleware,
      handler: updateOneLanguage,
    }
    
    const deleteOneLanguageSchema = {
      schema: {
        response: {
          200: languageObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneLanguage
    }
  
    const deleteAllLanguagesSchema = {
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
      handler: deleteAllLanguages,
    }

  
    module.exports = {
        getOneLanguageSchema,
        getAllLanguagesSchema,
        postOneLanguageSchema,
        postManyLanguageSchema,
        updateLanguageSchema,
        deleteOneLanguageSchema,
        deleteAllLanguagesSchema,
    }