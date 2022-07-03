const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getOneFacility = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetFacility = await prisma.facility.findFirst({
            where:{
                id
            }
        })
        reply.send(targetFacility)
    }catch(err){
        reply.send(err)
    }
}

const getAllFacilities = async(req,reply)=>{
    try{
        const targetFacilities = await prisma.facility.findMany({})
        reply.send(targetFacilities)
    }catch(err){
        reply.send(err)
    }
}

const createOneFacility = async(req,reply)=>{
    try{
        const {name,icon} = req.body
        const newFacility = await prisma.facility.create({
            data:{
                name,
                icon
            }
        })
        reply.send(newFacility)
    }catch(err){
        reply.send(err)
    }
}

const createManyFacilities = async(req,reply)=>{
    try{
     const {data} = req.body
     const facilities = await prisma.facility.createMany(data)
     reply.send(facilities)
    }catch(err){
        reply.send(err)
    }
}

const updateOneFacility = async(req,reply)=>{
    try{
      const id = Number.parseInt(req.params.id)
      const {name,icon} = req.body
      const facility = await prisma.facility.update({
          where:{
              id
          },
          data:{
              name,
              icon
          }
      })
      reply.send(facility)
    }catch(err){
        reply.send(err)
    }
}

const deleteOneFacility = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetFacility = await prisma.facility.delete({
            where:{
                id
            }
        })
        reply.send(targetFacility)
    }catch(err){
        reply.send(err)
    }
}

const deleteAllFacilities = async(req,reply)=>{
    try{
        const targetFacilities = await prisma.facility.deleteMany({})
        reply.send(targetFacilities)
    }catch(err){
        reply.send(err)
    }
}

module.exports = {
    getOneFacility,
    getAllFacilities,
    createOneFacility,
    createManyFacilities,
    updateOneFacility,
    deleteOneFacility,
    deleteAllFacilities
}