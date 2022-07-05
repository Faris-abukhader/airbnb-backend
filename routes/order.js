const {
    getOneOrderSchema,
    getAllOrdersSchema,
    getOnePropertyOrdersSchema,
    getOneClientOrdersSchema,
    postOneOrderSchema,
    updateOneOrderSchema,
    deleteOneOrderSchema,
    deleteAllOrdersSchema,
    acceptOneOrderSchema
} = require('../schema/orderSchema')  
const orderRoutes = (fastify, options, done)=> {

    fastify.get('/all/:pageNumber?',getAllOrdersSchema)

    fastify.get('/oneClient/:userId/:pageNumber?',getOneClientOrdersSchema)

    fastify.get('/oneProperty/:propertyId/:pageNumber?',getOnePropertyOrdersSchema)

    fastify.get('/:id',getOneOrderSchema)
    
    fastify.post('/', postOneOrderSchema)

    fastify.put('/accept/:id',acceptOneOrderSchema)

    fastify.put('/:id',updateOneOrderSchema)

    fastify.delete('/:id',deleteOneOrderSchema)

    fastify.delete('/',deleteAllOrdersSchema)

    done()
  }
  
  module.exports = orderRoutes
  