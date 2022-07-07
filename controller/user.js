const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {sendNewNotification} = require('../configuration/notifcationCenter')

  
const getAllUsers = async(req, reply) => {
  try{
    const users = await prisma.user.findMany({
      include:{
        client:true,
        staff:true
      }
    })
  reply.send(users)
  }catch(error){
    reply.send(error)
  }
}
  
  const getOneUser = async(req, reply) => {
    try{
      const id = Number.parseInt(req.params.id)
      const user = await prisma.user.findFirst({
          where:{
              id
          }
      })
      reply.send(user)  
    }catch(error){
      reply.send(error)
    }
  }
  
  const postOneUser = async(req, reply) => {
    try{
      const { email,firstName,secondName,image} = req.body
      await prisma.user.upsert({
        where:{
          email
        },
        create:{
          email,
          role:'client'
        },
        update:{}
      }).then(async(newUser)=>{

        // for sending welcoming notification
        let current = new Date()

        // have to check if this post not update request
        // if create then send notifcation 
        // if post don't send any notification
        if(current.getTime()-newUser.createdAt.getTime()<20){
          sendNewNotification(newUser.id,`hello ${secondName} ${firstName} `,'welcome to join our big family Airbnb')
        }

        const newClient = await prisma.client.upsert({
          where:{
           id:newUser.id
          },
          create:{
            id:newUser.id,
            firstName:firstName ??'',
            secondName:secondName??'',
            image,
          },
          update:{
            firstName:firstName ??'',
            secondName:secondName??'',
            image,
          },
          include:{
            user:{
              select:{
                email:true,
              }
            }
          }
        })
        let result = newClient
        result.email = newClient.user.email
        delete result.user
        reply.code(201).send(result)
      })
    }catch(error){
      console.log(error)
      reply.send(error)
    }
  }
  
  const deleteOneUser = async(req, reply) => {
    try{
      const id = Number.parseInt(req.params.id)
      const user = await prisma.user.delete({
        where:{
            id
        }
    })
    reply.send(user)
    }catch(error){
      reply.send(error)
    }
  }

  const deleteAllUsers = async(req,reply)=>{
    try{
       const user = await prisma.user.deleteMany({})
       reply.send(user)
    }catch(error){
      reply.send(error)
    }
  }
  
  const updateOneUser = async(req, reply) => {
    try{
      const { id } = req.params
      const {email,password} = req.body  
      const user = await prisma.user.update({
        where:{
            id:id
        },
        data:{
            email,
            password,
        }
    })
    reply.send(user)
    }catch(error){
      reply.send(error)
    }
  }
  
  module.exports = {
    getAllUsers,
    getOneUser,
    postOneUser,
    updateOneUser,
    deleteOneUser,
    deleteAllUsers,
  }
  