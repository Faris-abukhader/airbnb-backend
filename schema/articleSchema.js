const {    
    getOneArticle,
    getallArticles,
    postOneArticle,
    updateOneArticle,
    deleteOneArticle,
    deleteAllArticles
      } = require('../controller/article')
  const adminMiddleware = require('../prevalidation/admin')
  const staffMiddleware = require('../prevalidation/staff')
  const websiteMiddleware = require('../prevalidation/website')
  const {
    articleObject,
    imageObject,
    tagObject
  } = require('../schema/schemaContainer')
  
    const getOneArticleSchema = {
      schema: {
        response: {
          200: articleObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneArticle,
    }
    
    const getAllArticlesSchema = {
      schema: {
        response: {
            200:
            {
              type: 'object',
              properties: {
                data:{
                  type: 'array',
                  item: articleObject,
                },          
                pageNumber: { type: 'integer' },
              }
            }
          },
      },
      preValidation:websiteMiddleware,
      handler: getallArticles,
    }
    
    const postOneArticleSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['tags','title','content','description','topic','publisherId','images'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            description: { type: 'string' },
            topic: { type: 'string' },
            publisherId: { type: 'integer' },
            images:{
                type:'array',
                items:imageObject
            },
            tags:{
                type:'array',
                items:tagObject
            }
          },
        },
        response: {
          201: articleObject,
        },
      },
      preValidation:staffMiddleware,
      handler: postOneArticle,
    }
  

    const updateOneArticleSchema = {
      schema: {
        body: {
            type: 'object',
            required: ['tags','title','content','description','topic','publisherId','images'],
            properties: {
              title: { type: 'string' },
              content: { type: 'string' },
              description: { type: 'string' },
              topic: { type: 'string' },
              publisherId: { type: 'integer' },
              images:{
                type:'array',
                items:imageObject
              },
              tags:{
                  type:'array',
                  items:tagObject
              }
            },
          },
        response: {
          200: articleObject,
        },
      },
      preValidation:staffMiddleware,
      handler: updateOneArticle,
    }
    
    const deleteOneArticleSchema = {
      schema: {
        response: {
          200: articleObject
        },
      },
      preValidation:staffMiddleware,
      handler: deleteOneArticle
    }
  
    const deleteAllArticlesSchema = {
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
      handler: deleteAllArticles,
    }
  
    module.exports = {
        getOneArticleSchema,
        getAllArticlesSchema,
        postOneArticleSchema,
        updateOneArticleSchema,
        deleteOneArticleSchema,
        deleteAllArticlesSchema,
    }