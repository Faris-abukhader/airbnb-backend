const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {propertyTypeRange} = require('../configuration/paginationRange')


const getOneType = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetType = await prisma.propertyType.findFirst({
            where:{
                id
            }
        })
        reply.send(targetType)
    }catch(err){
        reply.send(err)
    }
}

const getAllTypes = async(req,reply)=>{
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        await prisma.propertyType.count().then(async(length)=>{
            const data = await prisma.propertyType.findMany({
                take:propertyTypeRange,
                skip:toSkip ? (pageNo-1)*amenityRange:0,
            })
            reply.send({data,pageNumber:Math.ceil(length/25)})                
        })
    }catch(err){
        reply.send(err)
    }
}

const createOneType = async(req,reply)=>{
    try{
        const {name} = req.body
        const newType = await prisma.propertyType.create({
            data:{
                name,
            }
        })
        reply.send(newType)
    }catch(err){
        reply.send(err)
    }
}

const createManyTypes = async(req,reply)=>{
    try{
     const {data} = req.body
     const types = await prisma.propertyType.createMany({data:data})
     reply.send(types)
    }catch(err){
        reply.send(err)
    }
}

const updateOneType = async(req,reply)=>{
    try{
      const id = Number.parseInt(req.params.id)
      const {name,icon} = req.body
      const targetType = await prisma.propertyType.update({
          where:{
              id
          },
          data:{
              name,
          }
      })
      reply.send(targetType)
    }catch(err){
        reply.send(err)
    }
}

const deleteOneType = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetType = await prisma.propertyType.delete({
            where:{
                id
            }
        })
        reply.send(targetType)
    }catch(err){
        reply.send(err)
    }
}

const deleteAllTypes = async(req,reply)=>{
    try{
        const targetTypes = await prisma.propertyType.deleteMany({})
        reply.send(targetTypes)
    }catch(err){
        reply.send(err)
    }
}

const deleteManyType = async(req,reply)=>{
    try{
        const {ids} = req.body
        const data = await prisma.propertyType.deleteMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
        reply.send(data)
    }catch(err){
        reply.send(err)
    }
}

module.exports = {
    getOneType,
    getAllTypes,
    createOneType,
    createManyTypes,
    updateOneType,
    deleteOneType,
    deleteAllTypes,
    deleteManyType
}