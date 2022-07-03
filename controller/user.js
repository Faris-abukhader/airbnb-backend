const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

  
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
      await prisma.user.create({
          data:{
              email,
              role:'client'
          }
      }).then(async(newUser)=>{
        const newClient = await prisma.client.create({
          data:{
            id:newUser.id,
            firstName,
            secondName,
            image,
          }
        })
        reply.code(201).send(newUser)
      })  
    }catch(error){
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
  