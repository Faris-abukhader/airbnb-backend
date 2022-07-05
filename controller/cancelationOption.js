const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getOneCanelationOption = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetOption = await prisma.cancelationOption.findFirst({
            where:{
                id
            }
        })
        reply.send(targetOption)
    }catch(err){
        reply.send(err)
    }
}

const getAllCanelationOptions = async(req,reply)=>{
    try{
        const targetCanelationOptions = await prisma.cancelationOption.findMany({})
        reply.send(targetCanelationOptions)
    }catch(err){
        reply.send(err)
    }
}

const createOneCanelationOption = async(req,reply)=>{
    try{
        const {name,offSetMilli} = req.body
        const newCanelationOption = await prisma.cancelationOption.create({
            data:{
                name,
                offSetMilli
            }
        })
        console.log(newCanelationOption)
        reply.send(newCanelationOption)
    }catch(err){
        reply.send(err)
    }
}

const createManyCanelationOptions = async(req,reply)=>{
    try{
     const {data} = req.body
     const CanelationOptions = await prisma.cancelationOption.createMany(data)
     reply.send(CanelationOptions)
    }catch(err){
        reply.send(err)
    }
}

const updateOneCanelationOption = async(req,reply)=>{
    try{
      const id = Number.parseInt(req.params.id)
      const {name,offSetMilli} = req.body
      const canelationOption = await prisma.cancelationOption.update({
          where:{
              id
          },
          data:{
              name,
              offSetMilli
          }
      })
      reply.send(canelationOption)
    }catch(err){
        reply.send(err)
    }
}

const deleteOneCanelationOption = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetCanelationOption = await prisma.cancelationOption.delete({
            where:{
                id
            }
        })
        reply.send(targetCanelationOption)
    }catch(err){
        reply.send(err)
    }
}

const deleteAllCanelationOptions = async(req,reply)=>{
    try{
        const targetCanelationOptions = await prisma.cancelationOption.deleteMany({})
        reply.send(targetCanelationOptions)
    }catch(err){
        reply.send(err)
    }
}

module.exports = {
    getOneCanelationOption,
    getAllCanelationOptions,
    createOneCanelationOption,
    createManyCanelationOptions,
    updateOneCanelationOption,
    deleteOneCanelationOption,
    deleteAllCanelationOptions
}