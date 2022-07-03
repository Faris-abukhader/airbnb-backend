const {
    getOneFacilitySchema,
    getAllFacilitiesSchema,
    postOneFacilitySchema,
    postManyFacilitiesSchema,
    updateFacilitySchema,
    deleteOneFacilitySchema,
    deleteAllFacilitiesSchema} = require('../schema/facilitySchema')  
const facilityRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllFacilitiesSchema)
  
    // Get single items
    fastify.get('/:id', getOneFacilitySchema)

    // Add manay items
    fastify.post('/many', postManyFacilitiesSchema)
  
    // Add item
    fastify.post('/', postOneFacilitySchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneFacilitySchema)

    // Delete all items
    fastify.delete('/', deleteAllFacilitiesSchema)
  
    // Update item
    fastify.put('/:id', updateFacilitySchema)
  
    done()
  }
  
  module.exports = facilityRoutes
  