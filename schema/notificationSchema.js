const {    
  createOneNotification,
  getNotificationById,
  getAllNotifications,
  getOnClientNotifications,
  getOneUserTopNotifications,
  updateOnNotification,
  deleteOneNotification,
  deleteAllNotifications,
  deleteManyNotification
} = require('../controller/notification')

  const {
    notificationObject
  } = require('../schema/schemaContainer')

  const adminMiddleware = require('../prevalidation/admin')
  const websiteMiddleware = require('../prevalidation/website')
  const clientMiddleware = require('../prevalidation/client')
  const staffMiddleware = require('../prevalidation/staff')
  
  
    const getOneNotificationSchema = {
      schema: {
        response: {
          200: notificationObject,
        },
      },
      preValidation:clientMiddleware,
      handler: getNotificationById,
    }
    
    const getAllNotificationsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: notificationObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:adminMiddleware,
      handler: getAllNotifications,
    }

    const getOnClientNotificationsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: notificationObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:clientMiddleware,
      handler:getOnClientNotifications
    }

    const getOneUserTopNotificationsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: notificationObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:clientMiddleware,
      handler:getOneUserTopNotifications
    }
    
    const postOneNotificationSchema = {
      schema: {
        body: {
          type: 'object',
          required: ['recieverId','title','content'],
          properties: {
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
      preValidation:staffMiddleware,
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
      preValidation:staffMiddleware,
      handler: updateOnNotification,
    }
    
    const deleteNotificationSchema = {
      schema: {
        response: {
          200: notificationObject
        },
      },
      preValidation:adminMiddleware,
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
      preValidation:adminMiddleware,
      handler: deleteAllNotifications,
    }

    const deleteManyNotificationSchema = {
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
      handler: deleteManyNotification,
    }

  
    module.exports = {
        getOneNotificationSchema,
        getAllNotificationsSchema,
        getOnClientNotificationsSchema,
        getOneUserTopNotificationsSchema,
        postOneNotificationSchema,
        updateNotificationSchema,
        deleteNotificationSchema,
        deleteAllNotificationSchema,
        deleteManyNotificationSchema
    }