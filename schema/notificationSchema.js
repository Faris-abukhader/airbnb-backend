const {    
    createOneNotification,
    getNotificationById,
    getAllNotifications,
    updateOnNotification,
    deleteOneNotification,
    deleteAllNotifications,
  } = require('../controller/notification')

  const {
    notificationObject
  } = require('../schema/schemaContainer')
  
  
    const getOneNotificationSchema = {
      schema: {
        response: {
          200: notificationObject,
        },
      },
      handler: getNotificationById,
    }
    
    const getAllNotificationsSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:notificationObject
          },
        },
      },
      handler: getAllNotifications,
    }
    
    const postOneNotificationSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['senderId','recieverId','title','content'],
          properties: {
            senderId: { type: 'integer' },
            recieverId: { type: 'integer' },
            title: { type: 'string' },
            content: { type: 'string' },
            isSeen: { type: 'integer' },
            createdAt:{type:'string'}    
          },
        },
        response: {
          201: notificationObject,
        },
      },
      handler: createOneNotification,
    }

  
    const updateNotificationSchema = {
      schema: {
        body:{
          type:'object',
          required: ['title','content'],
          properties:{
            title: { type: 'string' },
            content: { type: 'string' },
         }
        },
        response: {
          200: notificationObject,
        },
      },
      handler: updateOnNotification,
    }
    
    const deleteNotificationSchema = {
      schema: {
        response: {
          200: notificationObject
        },
      },
      handler: deleteOneNotification
    }
  
    const deleteAllNotificationSchema = {
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
      handler: deleteAllNotifications,
    }
  
    module.exports = {
        getOneNotificationSchema,
        getAllNotificationsSchema,
        postOneNotificationSchema,
        updateNotificationSchema,
        deleteNotificationSchema,
        deleteAllNotificationSchema,
    }