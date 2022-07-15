const {
    getOneOrderSchema,
    getAllOrdersSchema,
    getOnePropertyOrdersSchema,
    getOneClientOrdersSchema,
    postOneOrderSchema,
    updateOneOrderSchema,
    deleteOneOrderSchema,
    deleteAllOrdersSchema,
    acceptOneOrderSchema,
    payOneOrderSchema,
    refuseOneOrderSchema,
    cancelOnOrder,
} = require('../schema/orderSchema')  
const orderRoutes = (fastify, options, done)=> {

    fastify.get('/all/:pageNumber?',getAllOrdersSchema)

    fastify.get('/oneClient/:userId/:pageNumber?',getOneClientOrdersSchema)

    fastify.get('/oneProperty/:propertyId/:pageNumber?',getOnePropertyOrdersSchema)

    fastify.get('/:id',getOneOrderSchema)
    
    fastify.post('/', postOneOrderSchema)

    fastify.put('/accept/:id',acceptOneOrderSchema)

    fastify.put('/refuse/:id',refuseOneOrderSchema)

    fastify.put('/:id',updateOneOrderSchema)

    fastify.put('/pay/:id',payOneOrderSchema)

    fastify.put('/cancel/:propertyId/:bookingId',cancelOnOrder)

    fastify.delete('/:id',deleteOneOrderSchema)

    // fastify.delete('/',deleteAllOrdersSchema)

    done()
  }
  
  module.exports = orderRoutes
  