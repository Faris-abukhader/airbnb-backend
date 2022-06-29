const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

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
    try{
        const clients = await prisma.client.findMany({})
        reply.send(clients)
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