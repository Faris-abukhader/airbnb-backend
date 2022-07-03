const {
    getAllPropertiesSchema,
    searchPropertySchema,
    postOnePropertySchema,
    approvePropertySchema,
    disapprovePropertySchema,
    deleteOnePropertySchema,
    updateOnePropertySchema
} = require('../schema/propertySchema')  
const propertyRoutes = (fastify, options, done)=> {

    fastify.get('/all/:pageNumber?',getAllPropertiesSchema)

    fastify.get('/search/:pageNumber?',searchPropertySchema)
    
    fastify.post('/', postOnePropertySchema)

    fastify.put('/approve/:propertyId/:staffId',approvePropertySchema)

    fastify.put('/disapprove/:propertyId/:staffId',disapprovePropertySchema)

    fastify.put('/:propertyId',updateOnePropertySchema)

    fastify.delete('/:id',deleteOnePropertySchema)

    done()
  }
  
  module.exports = propertyRoutes
  