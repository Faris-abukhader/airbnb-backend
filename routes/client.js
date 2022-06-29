const {
    getOneClientSchema,
    getAllClientsSchema,
    updateOneClientSchema,
    deleteOneClientSchema,
    deleteAllClientsSchema
} = require('../schema/clientSchema')  
const clientRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllClientsSchema)
  
    // Get single items
    fastify.get('/:id', getOneClientSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneClientSchema)

    // Delete all items
    fastify.delete('/', deleteAllClientsSchema)
  
    // Update item
    fastify.put('/:id', updateOneClientSchema)
  
    done()
  }
  
  module.exports = clientRoutes
  