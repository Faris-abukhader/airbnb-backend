const {    
    getOneStaff,
    getAllStaffs,
    updateOneStaff,
    deleteOneStaff,
    deleteAllStaff
  } = require('../controller/staff')
  const clientMiddleware = require('../controller/auth')
  const fastify = require('fastify')()

  const staffObject = {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        secondName: { type: 'string' },
        image: { type: 'string' },
        createdAt:{type:'string'},
        lastUpdate:{type:'string'}
      },
    }
  
    const getOneStaffSchema = {
      schema: {
        response: {
          200: staffObject,
        },
      },
      handler: getOneStaff,
    }
    
    const getAllStaffsSchema = {
      schema: {
        response: {
          200: {
            type:'array',
            items:staffObject
          },
        },
      },
      handler: getAllStaffs,
    }
      
    const updateOneStaffSchema = {
      schema: {
        body:{
          type:'object',
          required:['firstName','secondName','image'],
          properties:{
            firstName:{type:'string'},
            secondName:{type:'string'},
            image:{type:'string'}
          }
        },
        response: {
          200: staffObject,
        },
      },
      handler: updateOneStaff,
    }
    
    const deleteOneStaffSchema = {
      schema: {
        response: {
          200: staffObject
        },
      },
      handler: deleteOneStaff
    }
  
    const deleteAllStaffsSchema = {
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
      handler: deleteAllStaff,
    }
  
    module.exports = {
        getOneStaffSchema,
        getAllStaffsSchema,
        updateOneStaffSchema,
        deleteOneStaffSchema,
        deleteAllStaffsSchema
    }