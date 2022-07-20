const {    
    getOneStaff,
    getAllStaffs,
    postOneStaff,
    updateOneStaff,
    deleteOneStaff,
    deleteAllStaff,
    deleteManyStaff
  } = require('../controller/staff')
  const adminMiddleware = require('../prevalidation/admin')
  const staffMiddleware = require('../prevalidation/staff')
  const websiteMiddleware = require('../prevalidation/website')

  
  const {
    staffObject
  } = require('../schema/schemaContainer')
  
    const getOneStaffSchema = {
      schema: {
        response: {
          200: staffObject,
        },
      },
      preValidation:websiteMiddleware,
      handler: getOneStaff,
    }
    
    const getAllStaffsSchema = {
      schema: {
        response: {
          200:
          {
            type: 'object',
            properties: {
              data:{
                type: 'array',
                item: staffObject,
              },          
              pageNumber: { type: 'integer' },
            }
          }
        },
      },
      preValidation:adminMiddleware,
      handler: getAllStaffs,
    }

    const postOneStaffSchema = {
      schema: {
        body:{
          type:'object',
          required:['email','firstName','secondName','image'],
          properties:{
            email:{type:'string'},
            firstName:{type:'string'},
            secondName:{type:'string'},
            image:{type:'string'}
          }
        },
        response: {
          200: {
            type:'object',
            required:['firstName','secondName','image'],
            properties:{
              id:{type:'integer'},
              email:{type:'string'},
              firstName:{type:'string'},
              secondName:{type:'string'},
              image:{type:'string'}
            }  
          },
        },
      },
      preValidation:adminMiddleware,
      handler: postOneStaff,
    }
      
    const updateOneStaffSchema = {
      schema: {
        body:{
          type:'object',
          required:['email','firstName','secondName','image'],
          properties:{
            email:{type:'string'},
            firstName:{type:'string'},
            secondName:{type:'string'},
            image:{type:'string'}
          }
        },
        response: {
          200: {
            type:'object',
            properties:{
            email:{type:'string'},
            firstName:{type:'string'},
            secondName:{type:'string'},
            image:{type:'string'},
            createdAt:{type:'string'},
            lastUpdate:{type:'string'}
           }
          },
        },
      },
      preValidation:staffMiddleware,
      handler: updateOneStaff,
    }
    
    const deleteOneStaffSchema = {
      schema: {
        response: {
          200: staffObject
        },
      },
      preValidation:adminMiddleware,
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
      preValidation:adminMiddleware,
      handler: deleteAllStaff,
    }

    const deleteManyStaffsSchema = {
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
      handler: deleteManyStaff,
    }
  
    module.exports = {
        getOneStaffSchema,
        getAllStaffsSchema,
        postOneStaffSchema,
        updateOneStaffSchema,
        deleteOneStaffSchema,
        deleteAllStaffsSchema,
        deleteManyStaffsSchema
    }