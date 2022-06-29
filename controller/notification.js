const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const createOneNotification = async(req,reply)=>{
    try{
        const {senderId,recieverId,title,content} = req.body

        const notification = await prisma.notification.create({
            data:{
                senderId,
                recieverId,
                title,
                content,
                isSeen:false
            }
        })

        reply.send(notification)

    }catch(error){
        reply.send(error)
    }

}

const createManyNotifications = async(req,reply)=>{
    try{
        const {data} = req.body
        const notifications = await prisma.notification.createMany({
            data:{
                data
            }
        })
        reply.send(notifications)
    }catch(error){
        reply.send(error)
    }

}

const getNotificationById = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetNotification = await prisma.notification.findUnique({where:{id}})
        reply.send(targetNotification)
    }catch(error){
        reply.send(error)
    }

}

const getAllNotifications = async(req,reply)=>{
    try{
        const notifications = await prisma.notification.findMany({})
        reply.send(notifications)
    }catch(error){
        reply.send(error)
    }

}

const updateOnNotification = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const {title,content} = req.body
        const notification = await prisma.notification.update({
            where:{
                id
            },
            data:{
                title,
                content
            }
        })
    }catch(error){
        reply.send(error)
    }

}

const deleteOneNotification = async(req,reply)=>{
    try{        
        const id = Number.parseInt(req.params.id)
        const targetNotification = await prisma.notification.delete({where:{id}})
        reply.send(targetNotification)
    }catch(error){
        reply.send(error)
    }

}

const deleteAllNotifications = async(req,reply)=>{
    try{
        const targetNotifications = await prisma.notification.deleteMany({})
        reply.send(targetNotifications)
    }catch(error){
        reply.send(error)
    }

}
module.exports = {
    createOneNotification,
    createManyNotifications,
    getNotificationById,
    getAllNotifications,
    updateOnNotification,
    deleteOneNotification,
    deleteAllNotifications,
}