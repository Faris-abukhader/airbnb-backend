const {    
    getOneOrder,
    getOnePropertyOrders,
    getAllOrders,
    postOneOrder,
    updateOneOrder,
    deleteOneOrder,
    deleteAllOrders,
    acceptOneOrder,
    refuseOneOrder,
    payOneOrder,
    cancelOneOrder

      } = require('../controller/order')
  const adminMiddleware = require('../prevalidation/admin')
  const clientMiddleware = require('../prevalidation/admin')

  const {
    bookingOrderObject,
    orderReviewObject,
    guestInofObject,
    paymentCardObject,
    transactionObject
  } = require('../schema/schemaContainer')
  
    const getOneOrderSchema = {
      schema: {
        response: {
          201: bookingOrderObject,
        },
      },
      preValidation:clientMiddleware,
      handler: getOneOrder,
    }
    
    const getAllOrdersSchema = {
      schema: {
        response: {
          200:{
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: bookingOrderObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:adminMiddleware,
      handler: getAllOrders,
    }

    const getOnePropertyOrdersSchema = {
        schema: {
          response: {
            200: {
                type: 'object',
                properties: {
                  data:{
                    type: 'array',
                    item: bookingOrderObject,
                  },          
                  pageNumber: { type: 'integer' },
                }
              }
          },
        },
        preValidation:getOnePropertyOrders,
        handler: getAllOrders,
      }

      const getOneClientOrdersSchema = {
        schema: {
          response: {
            200:{
                type: 'object',
                properties: {
                  data:{
                    type: 'array',
                    item: bookingOrderObject,
                  },          
                  pageNumber: { type: 'integer' },
                }
              }
          },
        },
        preValidation:clientMiddleware,
        handler: getAllOrders,
      }  
    
    const postOneOrderSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['propertyId','guestId','checkIn','checkOut','isForWork','firstName','secondName',
                     'email','arrivalTime','country','phoneNumber',
                     'cardHolderName','cardType','cardNumber','expirationDate'],
            properties: {
            propertyId:{type:'integer'},
            guestId:{type:'integer'},                                                      
            checkIn:{type:'string'},                           
            checkOut:{type:'string'},                    
            isForWork:{type:'integer'},                    
            createdAt:{type:'string'},                       
            lastUpdate:{type:'string'}, 
            review:orderReviewObject,
            guestInfo:guestInofObject,
            paymentCard:paymentCardObject,
            transaction:transactionObject, 
            },
        },
        response: {
          201: bookingOrderObject,
        },
      },
      preValidation:clientMiddleware,
      handler: postOneOrder,
    }
    
    const updateOneOrderSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['propertyId','checkIn','checkOut','isForWork','firstName','secondName',
                     'email','arrivalTime','country','phoneNumber',
                     'cardHolderName','cardType','cardNumber','expirationDate'],
            properties: {
            propertyId:{type:'integer'},                           
            checkIn:{type:'string'},                           
            checkOut:{type:'string'},                    
            isForWork:{type:'integer'},                    
            createdAt:{type:'string'},                       
            lastUpdate:{type:'string'}, 
            review:orderReviewObject,
            guestInfo:guestInofObject,
            paymentCard:paymentCardObject,
            transaction:transactionObject, 
            },
        },
        response: 
        {
          201: bookingOrderObject,
        },
      },
      preValidation:clientMiddleware,
      handler: updateOneOrder,
    }
    
    const deleteOneOrderSchema = {
      schema: {
        response: {
          200: bookingOrderObject
        },
      },
      preValidation:adminMiddleware,
      handler: deleteOneOrder
    }
  
    const deleteAllOrdersSchema = {
      schema: {
        response: {
          200:{
            type:'object',
            properties:{
              count:{type:'integer'},
            }  
          },
        },
      },
      preValidation:adminMiddleware,
      handler: deleteAllOrders,
    }

    const payOneOrderSchema = {
      schema:{
        response:{
          200:transactionObject
        }
      },
      preValidation:clientMiddleware,
      handler:payOneOrder,
    }
    /**
     *     acceptOneOrder,
    refuseOneOrder,
    payOneOrder,
    cancelOneOrder

     */

    const acceptOneOrderSchema = {
      schema:{
        response:{
          200:{
            type:'object',
            properties:{
              id:{type:'integer'},                    
              propertyId:{type:'integer'},                           
              checkIn:{type:'string'},                           
              checkOut:{type:'string'},                    
              isForWork:{type:'integer'},                    
              createdAt:{type:'string'},                       
              lastUpdate:{type:'string'},
              isAccepted:{type:'integer'}, 
              acceptionDate:{type:'string'}, 
              isRefused:{type:'integer'}, 
              refusedDate:{type:'string'}, 
              refusedReason:{type:'string'},                  
            }
          }
        }
      },
      preValidation:clientMiddleware,
      handler:acceptOneOrder,
    }

    const refuseOneOrderSchema = {
      schema:{
        response:{
          200:{
            type:'object',
            properties:{
              id:{type:'integer'},                    
              propertyId:{type:'integer'},                           
              checkIn:{type:'string'},                           
              checkOut:{type:'string'},                    
              isForWork:{type:'integer'},                    
              createdAt:{type:'string'},                       
              lastUpdate:{type:'string'},
              isAccepted:{type:'integer'}, 
              acceptionDate:{type:'string'}, 
              isRefused:{type:'integer'}, 
              refusedDate:{type:'string'}, 
              refusedReason:{type:'string'},                  
            }
          }
        }
      },
      preValidation:clientMiddleware,
      handler:refuseOneOrder,
    }

    const cancelOnOrder = {
      schema:{
        response:200
      },
      preValidation:clientMiddleware,
      handler:cancelOneOrder,
    }
  
    module.exports = {
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
        cancelOnOrder
    }