const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {clientRange} = require('../configuration/paginationRange')

const getOneClient = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const client = await prisma.client.findFirst({
            where:{
                id
            }
        })
        reply.send(client)
    }catch(error){
     reply.send(error)
    }
}

const getAllClients = async(req,reply)=>{
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        await prisma.client.count().then(async(length)=>{
            const data = await prisma.client.findMany({
                take:clientRange,
                skip:toSkip ? (pageNo-1)*clientRange:0,
            })
            reply.send({data,pageNumber:Math.ceil(length/25)})    
        })
    }catch(error){
     reply.send(error)
    }
}

const updateOneClient = async(req,reply)=>{
    try{
       const id = Number.parseInt(req.params.id)
       const {firstName,secondName,image} = req.body
       const client = await prisma.client.update({
           where:{
               id
           },
           data:{
            firstName,
            secondName,
            image,
           }
       })
       reply.send(client)
    }catch(error){
     reply.send(error)
    }
}

const deleteOneClient = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const client = await prisma.client.delete({
            where:{
                id
            }
        })
        reply.send(client)
    }catch(error){
     reply.send(error)
    }
}

const deleteAllClient = async(req,reply)=>{
    try{
        const clients = await prisma.client.deleteMany({})
        reply.send(clients)
    }catch(error){
     reply.send(error)
    }
}

module.exports = {
    getOneClient,
    getAllClients,
    updateOneClient,
    deleteOneClient,
    deleteAllClient
}