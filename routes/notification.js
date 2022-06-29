const {
    getOneNotificationSchema,
    getAllNotificationsSchema,
    postOneNotificationSchema,
    postManyNotificationSchema,
    updateNotificationSchema,
    deleteNotificationSchema,
    deleteAllNotificationSchema,
} = require('../schema/notificationSchema')  
const notificationRoutes = (fastify, options, done)=> {
  
    // Get all items
    fastify.get('/', getAllNotificationsSchema)
  
    // Get single items
    fastify.get('/:id', getOneNotificationSchema)

    // Add manay items
    fastify.post('/many', postManyNotificationSchema)
  
    // Add item
    fastify.post('/', postOneNotificationSchema)
  
    // Delete item
    fastify.delete('/:id', deleteNotificationSchema)

    // Delete all items
    fastify.delete('/', deleteAllNotificationSchema)
  
    // Update item
    fastify.put('/', updateNotificationSchema)
  
    done()
  }
  
  module.exports = notificationRoutes
  