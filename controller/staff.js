const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const getOneStaff = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const staff = await prisma.staff.findFirst({
            where:{
                id
            }
        })
        reply.send(staff)
    }catch(error){
     reply.send(error)
    }
}

const postOneStaff = async(req,reply)=>{
    try{
        const { email,firstName,secondName,image} = req.body
        await prisma.user.upsert({
          where:{
            email:email??''
          },
          create:{
            email,
            role:'staff'
          },
          update:{}
        }).then(async(newUser)=>{
          const newClient = await prisma.staff.upsert({
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

const getAllStaffs = async(req,reply)=>{
    try{
        const staffs = await prisma.staff.findMany({})
        reply.send(staffs)
    }catch(error){
     reply.send(error)
    }
}

const updateOneStaff = async(req,reply)=>{
    try{
       const id = Number.parseInt(req.params.id)
       const {firstName,secondName,image} = req.body
       const staff = await prisma.staff.update({
           where:{
               id
           },
           data:{
            firstName,
            secondName,
            image,
           }
       })
       reply.send(staff)
    }catch(error){
     reply.send(error)
    }
}

const deleteOneStaff = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const staff = await prisma.staff.delete({
            where:{
                id
            }
        })
        reply.send(staff)
    }catch(error){
     reply.send(error)
    }
}

const deleteAllStaff = async(req,reply)=>{
    try{
        const staffs = await prisma.staff.deleteMany({})
        reply.send(staffs)
    }catch(error){
     reply.send(error)
    }
}

module.exports = {
    getOneStaff,
    getAllStaffs,
    postOneStaff,
    updateOneStaff,
    deleteOneStaff,
    deleteAllStaff
}