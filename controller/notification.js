const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {notificationRange} = require('../configuration/paginationRange')

const sendOneNotification = async({recieverId,title,content})=>{
    await prisma.notification.create({
        data:{
            title,
            content,
            user:{
                connect:{
                    id:recieverId
                }
            },
        }
    })
}

const createOneNotification = async(req,reply)=>{
    try{
        const {recieverId,title,content} = req.body

        const notification = await prisma.notification.create({
            data:{
                recieverId,
                title,
                content,
            }
        })

        reply.send(notification)

    }catch(error){
        reply.send(error)
    }
}

const getOneUserTopNotifications = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const notifications = await prisma.notification.findMany({
            where:{
                recieverId:id
            },
            select:5,
            orderBy:{
                createdAt:'desc'
            }
        })
        reply.send(notifications)
    }catch(error){
        reply.send(error)
    }
}

const getOnClientNotifications = async(req,reply)=>{
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        const id = Number.parseInt(req.params.id)
        await prisma.notification.count({
            where:{
                recieverId:id
            }
        }).then(async(length)=>{
            const data = await prisma.notification.findMany({
                where:{
                    recieverId:id
                    
                },
                orderBy:{
                    createdAt:'desc'
                },    
                take:notificationRange,
                skip:toSkip ? (pageNo-1)*notificationRange:0,
            })
            reply.send({data,pageNumber:Math.ceil(length/notificationRange)})                
        })

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
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        await prisma.notification.count({}).then(async(length)=>{
            const data = await prisma.notification.findMany({
                orderBy:{
                    createdAt:'desc'
                },    
                take:notificationRange,
                skip:toSkip ? (pageNo-1)*notificationRange:0,
            })
            reply.send({data,pageNumber:Math.ceil(length/notificationRange)})                
        })
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
        reply.send(notification)
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

const deleteManyNotification = async(req,reply)=>{
    try{
        const {ids} = req.body
        const data = await prisma.notification.deleteMany({
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
    sendOneNotification,
    createOneNotification,
    getNotificationById,
    getAllNotifications,
    getOnClientNotifications,
    getOneUserTopNotifications,
    updateOnNotification,
    deleteOneNotification,
    deleteAllNotifications,
    deleteManyNotification
}