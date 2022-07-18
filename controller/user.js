const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {sendNewNotification} = require('../configuration/notifcationCenter')
const {userRange} = require('../configuration/paginationRange')

  
const getAllUsers = async(req, reply) => {

  let pageNo = 0
  let toSkip = false
  if(req.params.pageNumber){
    pageNo = req.params.pageNumber
    toSkip = true
  }

  try{
      await prisma.user.count().then(async(length)=>{
          const data = await prisma.user.findMany({
              take:userRange,
              skip:toSkip ? (pageNo-1)*userRange:0,
              include:{
                client:true,
                staff:true
              }
            
          })

          let result = data
          result.map((item)=>{
            temp = item
            if(item.client){
              delete item.staff
              temp.firstName = item.client.firstName
              temp.secondName = item.client.secondName
              delete temp.client
            }else if(item.staff){
              delete item.client
              temp.firstName = item.staff.firstName
              temp.secondName = item.staff.secondName
              delete temp.staff
            }else{
              delete item.client
              delete item.staff
            }
            return temp
          })
          reply.send({data:result,pageNumber:Math.ceil(length/userRange)})                
      })
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

  // this user for admin dashboard to create new user (admin,staff,client)
  const postUser = async(req,reply)=>{
    console.log('hara hara')
    try{
      const { email,firstName,secondName,role,image} = req.body
      await prisma.user.create({
        data:{
          email,
          role
        },
      }).then(async(newUser)=>{
        
        if(newUser.role == 'staff' || newUser.role == 'client'){
          if(newUser.role == 'staff'){
            const newStaff = await prisma.staff.create({
              data:{
                id:newUser.id,
                firstName,
                secondName,
                image,
              },
              include:{
                user:{
                  select:{
                    role:true,
                    email:true
                  }
                }
              }
            })
            let result = newStaff
            result.role = newStaff.user.role
            result.email = newStaff.user.email
            delete result.user;
            reply.code(201).send(result)
          }else{
            const newClient = await prisma.client.create({
              data:{
                id:newUser.id,
                firstName,
                secondName,
                image
              },
              include:{
                user:{
                  select:{
                    role:true,
                    email:true
                  }
                }
              }
            })
            let result = newClient
            result.role = newClient.user.role
            result.email = newClient.user.email
            delete result.user;
            reply.code(201).send(result)
          }
        }
      })

    }catch(error){
      console.log(error)
      reply.send(error)
    }
  }
  
  // this is user for client website in each time the user signin
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

  const deleteManyUsers = async(req,reply)=>{
    try{
      const {ids} = req.body
       const user = await prisma.user.deleteMany({
         where:{
           id:{
             in:ids
           }
         }
       })
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
    postUser,
    updateOneUser,
    deleteOneUser,
    deleteAllUsers,
    deleteManyUsers,
  }
  