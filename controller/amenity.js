const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {amenityRange} = require('../configuration/paginationRange')


const getOneAmenity = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetAmenity = await prisma.amenity.findFirst({
            where:{
                id
            }
        })
        reply.send(targetAmenity)
    }catch(err){
        reply.send(err)
    }
}

const getAllAmenities = async(req,reply)=>{
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        await prisma.amenity.count().then(async(length)=>{
            const targetAmenities = await prisma.amenity.findMany({
                take:amenityRange,
                skip:toSkip ? (pageNo-1)*amenityRange:0,
            })
            reply.send({data:targetAmenities,pageNumber:Math.ceil(length/25)})                
        })
    }catch(err){
        reply.send(err)
    }
}

const createOneAmenity = async(req,reply)=>{
    try{
        const {name} = req.body
        const newAmenity = await prisma.amenity.create({
            data:{
                name,
                icon
            }
        })
        reply.send(newAmenity)
    }catch(err){
        reply.send(err)
    }
}

const createManyAmenities = async(req,reply)=>{
    try{
     const {data} = req.body
     const amenities = await prisma.amenity.createMany(data)
     reply.send(amenities)
    }catch(err){
        reply.send(err)
    }
}

const updateOneAmenity = async(req,reply)=>{
    try{
      const id = Number.parseInt(req.params.id)
      const {name,icon} = req.body
      const amenity = await prisma.amenity.update({
          where:{
              id
          },
          data:{
              name,
              icon
          }
      })
      reply.send(amenity)
    }catch(err){
        reply.send(err)
    }
}

const deleteOneAmenity = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetAmenity = await prisma.amenity.delete({
            where:{
                id
            }
        })
        reply.send(targetAmenity)
    }catch(err){
        reply.send(err)
    }
}

const deleteAllAmenities = async(req,reply)=>{
    try{
        const targetAmenities = await prisma.amenity.deleteMany({})
        reply.send(targetAmenities)
    }catch(err){
        reply.send(err)
    }
}

const deleteManyAmenites = async(req,reply)=>{
    try{
        const {ids} = req.body
        const data = await prisma.amenity.deleteMany({
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
    getOneAmenity,
    getAllAmenities,
    createOneAmenity,
    createManyAmenities,
    updateOneAmenity,
    deleteOneAmenity,
    deleteAllAmenities,
    deleteManyAmenites
}