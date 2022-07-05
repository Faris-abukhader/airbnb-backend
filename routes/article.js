const {
    getOneArticleSchema,
    getAllArticlesSchema,
    postOneArticleSchema,
    updateOneArticleSchema,
    deleteOneArticleSchema,
    deleteAllArticlesSchema,
} = require('../schema/articleSchema')  
const articleRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllArticlesSchema)
  
    // Get single items
    fastify.get('/:id', getOneArticleSchema)

    // Add item
    fastify.post('/', postOneArticleSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneArticleSchema)

    // Delete all items
    fastify.delete('/', deleteAllArticlesSchema)
  
    // Update item
    fastify.put('/:id', updateOneArticleSchema)
  
    done()
  }
  
  module.exports = articleRoutes
  