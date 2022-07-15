const {
    getOneLanguageSchema,
    getAllLanguagesSchema,
    postOneLanguageSchema,
    postManyLanguageSchema,
    updateLanguageSchema,
    deleteOneLanguageSchema,
    deleteAllLanguagesSchema,
    deleteManyLanguagesSchema
} = require('../schema/languageSchema')  
const languageRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllLanguagesSchema)
  
    // Get single items
    fastify.get('/:id', getOneLanguageSchema)

    // Add manay items
    fastify.post('/many', postManyLanguageSchema)
  
    // Add item
    fastify.post('/', postOneLanguageSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneLanguageSchema)

    // Delete all items
    fastify.delete('/', deleteManyLanguagesSchema)
  
    // Update item
    fastify.put('/:id', updateLanguageSchema)
  
    done()
  }
  
  module.exports = languageRoutes
  