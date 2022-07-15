const {
  getOneUserSchema,
  getAllUsersSchema,
  postOneUserSchema,
  updateOneUserSchema,
  deleteOneUserSchema,
  deleteAllUsersSchema,
} = require('../schema/userSchema')  
const userRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllUsersSchema)
  
    // Get single items
    fastify.get('/:id', getOneUserSchema)
  
    // Add item
    fastify.post('/', postOneUserSchema)
  
    // Delete item
    fastify.delete('/:id', deleteOneUserSchema)

    // Delete all item
    // fastify.delete('/', deleteAllUsersSchema)

    // Update item
    fastify.put('/:id', updateOneUserSchema)
  
    done()
  }
  
  module.exports = userRoutes
  