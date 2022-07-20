const {    
    signInAdmin,
  } = require('../controller/auth')
  const websiteMiddleware = require('../prevalidation/website')
const { adminObject } = require('./schemaContainer')
  

  const adminSignInSchema = {
    schema: {
        body: {
          type: 'object',
          required: ['email','password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: 200,
      },
      preValidation:websiteMiddleware,
      handler:signInAdmin
  }
    
  
    module.exports = {
        adminSignInSchema,
    }