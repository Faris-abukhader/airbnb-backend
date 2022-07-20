const {
    adminSignInSchema
} = require('../schema/authSchema') 
const path = require('path')
const fs = require('fs')

const authRoutes = (fastify, options, done)=> {
  
    // sigIn for admin
    fastify.post('/admin', adminSignInSchema)
  
    done()
  }
  
  module.exports = authRoutes
  