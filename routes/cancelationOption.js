const {
    getOneCancelationOptionSchema,
    getAllCancelationOptionsSchema,
    postOneCancelationOptionSchema,
    postManyCanelationOptionsSchema,
    updateOneCancelationOptionSchema,
    deleteOneCanelationOptionSchema,
    deleteAllCanelationOptionsSchema,
} = require('../schema/cancelationOptionSchema')  
const cancelationOptionRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllCancelationOptionsSchema)
  
    // Get single items
    fastify.get('/:id', getOneCancelationOptionSchema)

    // Add manay items
    fastify.post('/many', postManyCanelationOptionsSchema)
  
    // Add item
    fastify.post('/', postOneCancelationOptionSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneCanelationOptionSchema)

    // Delete all items
    fastify.delete('/', deleteAllCanelationOptionsSchema)
  
    // Update item
    fastify.put('/:id', updateOneCancelationOptionSchema)
  
    done()
  }
  
  module.exports = cancelationOptionRoutes
  