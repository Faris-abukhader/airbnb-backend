const {
    getOneStaffSchema,
    getAllStaffsSchema,
    updateOneStaffSchema,
    deleteOneStaffSchema,
    deleteAllStaffsSchema
} = require('../schema/staffSchema')  
const staffRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllStaffsSchema)
  
    // Get single items
    fastify.get('/:id', getOneStaffSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneStaffSchema)

    // Delete all items
    fastify.delete('/', deleteAllStaffsSchema)
  
    // Update item
    fastify.put('/:id', updateOneStaffSchema)
  
    done()
  }
  
  module.exports = staffRoutes
  