const {    
  getArticleTopic,
  getAllArticleTopics,
  postArticleTopic,
  postManyArticleTopics,
  updateOneArticle,
  deleteArticleTopic,
  deleteAllArticleTopics,
  deleteManyArticleTopic
} = require('../controller/articleTopic')
const adminMiddleware = require('../prevalidation/admin')
const websiteMiddleware = require('../prevalidation/website')
const fastify = require('fastify')()
const {
  articleTopicObject,
} = require('../schema/schemaContainer')

  const getArticleTopicObject = {
    schema: {
      response: {
        200: articleTopicObject,
      },
    },
    preValidation:websiteMiddleware,
    handler: getArticleTopic,
  }
  
  const getAllArticleTopicObjects = {
    schema: {
      response: {
        200:
        {
          type: 'object',
          properties: {
            data:{
              type: 'array',
              item: articleTopicObject,
            },          
            pageNumber: { type: 'integer' },
          }
        }
      },
    },
    preValidation:websiteMiddleware,
    handler: getAllArticleTopics,
  }
  
  const postArticleTopicObject = {
    schema: {
      body: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
        },
      },
      response: {
        201: articleTopicObject,
      },
    },
    preValidation:adminMiddleware,
    handler: postArticleTopic,
  }

  const postManyArticleTopicObjects = {
    schema: {
      body: {
        type:'object',
        properties:{
          data:{
            type:'array',
            items:{
              required: ['title'],
              type:'object',
              properties: {
                  title: { type: 'string' },
              },  
            }
          }
        }
      },
      response: {
        201: {
          type:'array',
          items:articleTopicObject
        },
      },
    },
    preValidation:adminMiddleware,
    handler: postManyArticleTopics,
  }

  const updateArticleTopicObject = {
    schema: {
      body:{
        type:'object',
        required:['title','id'],
        properties:{
          id:{type:'integer'},
          title:{type:'string'}
        }
      },
      response: {
        200: articleTopicObject,
      },
    },
    preValidation:adminMiddleware,
    handler: updateOneArticle,
  }
  
  const deleteArticleTopicObject = {
    schema: {
      response: {
        200: articleTopicObject
      },
    },
    preValidation:adminMiddleware,
    handler: deleteArticleTopic
  }

  const deleteAllArticleTopicObjects = {
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
    handler: deleteAllArticleTopics,
  }

  const deleteManyArticleTopicObjects = {
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
    handler: deleteManyArticleTopic,
  }


  module.exports = {
    getArticleTopicObject,
    getAllArticleTopicObjects,
    postArticleTopicObject,
    postManyArticleTopicObjects,
    updateArticleTopicObject,
    deleteArticleTopicObject,
    deleteAllArticleTopicObjects,
    deleteManyArticleTopicObjects
  }