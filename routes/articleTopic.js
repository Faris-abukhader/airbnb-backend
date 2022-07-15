const {
    getArticleTopicObject,
    getAllArticleTopicObjects,
    postArticleTopicObject,
    postManyArticleTopicObjects,
    updateArticleTopicObject,
    deleteArticleTopicObject,
    deleteAllArticleTopicObjects,
    deleteManyArticleTopicObjects
} = require('../schema/articleTopicSchema')  
const articleTopicRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllArticleTopicObjects)
  
    // Get single items
    fastify.get('/:id', getArticleTopicObject)

    // Add manay items
    fastify.post('/many', postManyArticleTopicObjects)
  
    // Add item
    fastify.post('/', postArticleTopicObject)
  
    // Delete item
    fastify.delete('/:id', deleteArticleTopicObject)

    // Delete all items
    fastify.delete('/', deleteManyArticleTopicObjects)
  
    // Update item
    fastify.put('/', updateArticleTopicObject)
  
    done()
  }
  
  module.exports = articleTopicRoutes
  