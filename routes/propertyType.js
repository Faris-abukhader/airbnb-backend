const {
    getOnePropertyTypeSchema,
    getAllPropertyTypesSchema,
    postOnePropertyTypeSchema,
    postManyPropertyTypesSchema,
    updatePropertyTypeSchema,
    deleteOnePropertyTypeSchema,
    deleteAllPropertyTypesSchema,
} = require('../schema/propertyTypeSchema')  
const propertyTypeRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllPropertyTypesSchema)
  
    // Get single items
    fastify.get('/:id', getOnePropertyTypeSchema)

    // Add manay items
    fastify.post('/many', postManyPropertyTypesSchema)
  
    // Add item
    fastify.post('/', postOnePropertyTypeSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOnePropertyTypeSchema)

    // Delete all items
    fastify.delete('/', deleteAllPropertyTypesSchema)
  
    // Update item
    fastify.put('/:id', updatePropertyTypeSchema)
  
    done()
  }
  
  module.exports = propertyTypeRoutes
  