const {
    getOneAmenitySchema,
    getAllAmenitiesSchema,
    postOneAmenitySchema,
    postManyAmenitiesSchema,
    updateAmenitySchema,
    deleteOneAmenitySchema,
    deleteAllAmenitiesSchema,
} = require('../schema/amenitySchema')  
const amenityRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllAmenitiesSchema)
  
    // Get single items
    fastify.get('/:id', getOneAmenitySchema)

    // Add manay items
    fastify.post('/many', postManyAmenitiesSchema)
  
    // Add item
    fastify.post('/', postOneAmenitySchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneAmenitySchema)

    // Delete all items
    fastify.delete('/', deleteAllAmenitiesSchema)
  
    // Update item
    fastify.put('/:id', updateAmenitySchema)
  
    done()
  }
  
  module.exports = amenityRoutes
  