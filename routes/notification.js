const {
    getOneNotificationSchema,
    getAllNotificationsSchema,
    getOnClientNotificationsSchema,
    getOneUserTopNotificationsSchema,
    postOneNotificationSchema,
    updateNotificationSchema,
    deleteNotificationSchema,
    deleteAllNotificationSchema,
    deleteManyNotificationSchema
} = require('../schema/notificationSchema')  
const notificationRoutes = (fastify, options, done)=> {

    // get one client notifications
    fastify.get('/clientNotifications/:id/:pageNumber?', getOnClientNotificationsSchema)

    // get one client top notification
    fastify.get('/clientTopNotifications/:id', getOneUserTopNotificationsSchema)
  
    // Get all items
    fastify.get('/all/:pageNumber?', getAllNotificationsSchema)
  
    // Get single items
    fastify.get('/:id', getOneNotificationSchema)
  
    // Add item
    fastify.post('/', postOneNotificationSchema)
  
    // Delete item
    fastify.delete('/:id', deleteManyNotificationSchema)

    // Delete all items
    fastify.delete('/', deleteAllNotificationSchema)
  
    // Update item
    fastify.put('/', updateNotificationSchema)
  
    done()
  }
  
  module.exports = notificationRoutes
  