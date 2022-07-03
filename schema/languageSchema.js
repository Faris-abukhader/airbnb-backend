const {    
    getOneLanguage,
    getAllLanguages,
    createOneLanguage,
    createManyLanguages,
    updateOneLanguage,
    deleteOneLanguage,
    deleteAllLanguages
  } = require('../controller/language')
  const clientMiddleware = require('../controller/auth')
  const fastify = require('fastify')()

  const {
    languageObject
  } = require('../schema/schemaContainer')
    
    const getOneLanguageSchema = {
      schema: {
        response: {
          200: languageObject,
        },
      },
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
      handler: updateOneLanguage,
    }
    
    const deleteOneLanguageSchema = {
      schema: {
        response: {
          200: languageObject
        },
      },
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