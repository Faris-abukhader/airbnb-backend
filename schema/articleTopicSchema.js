const {    
  getArticleTopic,
  getAllArticleTopics,
  postArticleTopic,
  postManyArticleTopics,
  updateOneArticle,
  deleteArticleTopic,
  deleteAllArticleTopics
} = require('../controller/articleTopic')
const clientMiddleware = require('../controller/auth')
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
    handler: getArticleTopic,
  }
  
  const getAllArticleTopicObjects = {
    schema: {
      response: {
        200: {
          type:'array',
          items:articleTopicObject
        },
      },
    },
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
    handler: postArticleTopic,
  }

  const postManyArticleTopicObjects = {
    schema: {
      body: {
        type: 'array',
        items:{
          required: ['title'],
          type:'object',
          properties: {
            title: { type: 'string' },
          },  
        }
      },
      response: {
        201: {
          type:'array',
          items:articleTopicObject
        },
      },
    },
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
    handler: updateOneArticle,
  }
  
  const deleteArticleTopicObject = {
    schema: {
      response: {
        200: articleTopicObject
      },
    },
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
    handler: deleteAllArticleTopics,
  }

  module.exports = {getArticleTopicObject,getAllArticleTopicObjects,postArticleTopicObject,postManyArticleTopicObjects,updateArticleTopicObject,deleteArticleTopicObject,deleteAllArticleTopicObjects}