const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 4500
const {sign} = require('jsonwebtoken')

// documentation ui Swagger library register
fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'Airbnb API docs' },
      
    },
    
  })

fastify.register(require('@fastify/cors'))

const fastifyEnv = require('@fastify/env')

const schema = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    }
  }
}

const options = {
  dotenv: true, // will read .env in root folder
  confKey: 'config', // optional, default: 'config'
  schema: schema,
}

const jwt = require('@fastify/jwt')
fastify.register(fastifyEnv, options)
       .after((err) => {
          if (err) console.error(err)
          fastify.register(jwt,{ secret:process.env.JWT_SECRET,verify:{
              extractToken:(req)=>{
                  return req.headers.token
              },
              allowedAud: 'token',
              allowedIss: 'example.tld',
          },
        })
})
// routers . . .
fastify.register(require('./routes/user'),{ prefix: '/user' })
fastify.register(require('./routes/property'),{prefix:'/property'})
fastify.register(require('./routes/order'),{prefix:'/order'})
fastify.register(require('./routes/articleTopic'),{prefix:'/articleTopic'})
fastify.register(require('./routes/notification'),{prefix:'/notification'})
fastify.register(require('./routes/client'),{prefix:'/client'})
fastify.register(require('./routes/staff'),{prefix:'/staff'})
fastify.register(require('./routes/language'),{prefix:'/language'})
fastify.register(require('./routes/facility'),{prefix:'/facility'})
fastify.register(require('./routes/amenity'),{prefix:'/amenity'})
fastify.register(require('./routes/article'),{prefix:'/article'})
fastify.register(require('./routes/cancelationOption'),{prefix:'/cancelationOption'})
fastify.register(require('./routes/propertyType'),{prefix:'/propertyType'})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT ,host:'0.0.0.0'})
    fastify.swagger()
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()


fastify.get('/token/:email',async(req,res)=>{
    const {email} = req.params
    const token = sign({email:email},process.env.JWT_SECRET)
    res.send({token})
})
