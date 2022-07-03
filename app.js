const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 4500
const {sign,verify, decode} = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma  = new PrismaClient()


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
fastify.register(require('./routes/articleTopic'),{prefix:'/articleTopic'})
fastify.register(require('./routes/notification'),{prefix:'/notification'})
fastify.register(require('./routes/client'),{prefix:'/client'})
fastify.register(require('./routes/staff'),{prefix:'/staff'})
fastify.register(require('./routes/language'),{prefix:'/language'})
fastify.register(require('./routes/facility'),{prefix:'/facility'})
fastify.register(require('./routes/amenity'),{prefix:'/amenity'})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT })
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


fastify.post('/test1/:option?',(req,res)=>{
   if(req.params.option){
     res.send(req.params.option)
   }else{
     res.send('no options')
   }
})


let aviableAttributes = [
  'name',
  'country',
  'city',
  'space',
  'guestArrive',
  'guestDepart',
  'canSmoke',
  'canHaveChildren',
  'acceptForeigner',
  'acceptPet',
  'type',
  'price'
]

const test = async()=>{
let pageNo = 0
  let toSkip = false
    pageNo = 0
    toSkip = false
  

    const query = {
      name:'yiwu',
      age:22,
      country:'jordan',
      city:'hangzhou',
      space:'9.6',
      canHaveChildren:'true'
    }
    var queryArray = Object.entries(query).filter((item)=>aviableAttributes.indexOf(item[0].toString())!=-1) 

    let OR = []


    queryArray.map((item)=>{
      let tempObj = {}
      let key = item[0]
      let value = item[1]
      if(key=='name'){
        let key1 = {
          contains:value
        }
        tempObj[key] = key1
      }else if (key=='space'){
       tempObj[key] = Number.parseFloat(value)
      }else{
        tempObj[key] = key=='canSmoke' || key=='canHaveChildren' || key=='acceptForeigner' || key=='acceptPet' ?  Boolean(value): value 
      }
      OR.push(tempObj)
    })
  
    console.log(OR)

    
    let where = {
      OR
    }

    console.log(where)

    await prisma.property.count().then(async(length)=>{
      let data = await prisma.property.findMany({
        where,
        take:25,
        skip:toSkip ? (pageNo-1)*25:0,
        include:{
          owner:true,
          images:{
            select:{
                images:true
            }
        },
        bedOptions:true,
        approve:{
            include:{
                staff:true
            }
        },
        amenities:true,
        facilities:true,
        languages:true,
        bookingOrders:true
        }
      })
      console.log({data,pageNumber:Math.ceil(length/25)})
  
    })
  }
  // test()