const {
    getOneAmenitySchema,
    getAllAmenitiesSchema,
    postOneAmenitySchema,
    postManyAmenitiesSchema,
    updateAmenitySchema,
    deleteOneAmenitySchema,
    deleteAllAmenitiesSchema,
    deleteManyAmenitiesSchema
} = require('../schema/amenitySchema')  
const amenityRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllAmenitiesSchema)
  
    // Get single items
    fastify.get('/:id', getOneAmenitySchema)

    // Add manay items
    fastify.post('/all/:pageNumber?', postManyAmenitiesSchema)
  
    // Add item
    fastify.post('/', postOneAmenitySchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneAmenitySchema)

    // Delete all items
    fastify.delete('/', deleteManyAmenitiesSchema)
  
    // Update item
    fastify.put('/:id', updateAmenitySchema)
  
    done()
  }
  
  module.exports = amenityRoutes
  