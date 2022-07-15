const {
    getOnePropertyTypeSchema,
    getAllPropertyTypesSchema,
    postOnePropertyTypeSchema,
    postManyPropertyTypesSchema,
    updatePropertyTypeSchema,
    deleteOnePropertyTypeSchema,
    deleteAllPropertyTypesSchema,
    deleteManyPropertyTypesSchema
} = require('../schema/propertyTypeSchema')  
const propertyTypeRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllPropertyTypesSchema)
  
    // Get single items
    fastify.get('/:id', getOnePropertyTypeSchema)

    // Add manay items
    fastify.post('/many', postManyPropertyTypesSchema)
  
    // Add item
    fastify.post('/', postOnePropertyTypeSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOnePropertyTypeSchema)

    // Delete all items
    fastify.delete('/', deleteManyPropertyTypesSchema)
  
    // Update item
    fastify.put('/:id', updatePropertyTypeSchema)
  
    done()
  }
  
  module.exports = propertyTypeRoutes
  