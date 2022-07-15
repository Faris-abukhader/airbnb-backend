const {PrismaClient} = require('@prisma/client')
const { sendNewNotification } = require('../configuration/notifcationCenter')
const prisma = new PrismaClient()
const {orderRange} = require('../configuration/paginationRange')

const getOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetOrder = await prisma.bookingOrder.findFirst({
            where:{
                id
            },
            include:{
              review:true,
              guestInfo:true,
              paymentCard:true,
              transaction:true,
            }
        })
        reply.send(targetOrder)
    }catch(error){
     reply.send(error)
    }
}

const getOnePropertyOrders = async(req,reply)=>{
    try{
       const propertyId = Number.parseInt(req.params.propertyId)

       let pageNo = 0
       let toSkip = false
       if(req.params.pageNumber){
         pageNo = req.params.pageNumber
         toSkip = true
       }


       await prisma.bookingOrder.count({
           where:{
             propertyId  
           }
       }).then(async(length)=>{
        const data = await prisma.property.findFirst({
            where:{
                id:propertyId
            }
            ,include:{
                bookingOrders:{
                    take:orderRange,
                    skip:toSkip ? (pageNo-1)*orderRange:0,
                }
            }
        })
        reply.send({data,pageNumber:Math.ceil(length/25)})                
    })
    }catch(error){
        reply.send(error)
    }
}


const getOneClientOrders = async(req,reply)=>{
    try{
       const clientId = Number.parseInt(req.params.clientId)

       let pageNo = 0
       let toSkip = false
       if(req.params.pageNumber){
         pageNo = req.params.pageNumber
         toSkip = true
       }


       await prisma.bookingOrder.count({
           where:{
               property:{
                   ownerId:clientId
               }
           }
       }).then(async(length)=>{
           const data = await prisma.bookingOrder.findMany({
                where:{
                    property:{
                        ownerId:clientId
                    }
                },
                take:orderRange,
                skip:toSkip ? (pageNo-1)*orderRange:0,
                include:{
                review:true,
                guestInfo:true,
                paymentCard:true,
                transaction:true,   
               }
           })
           reply.send({data,pageNumber:Math.ceil(length/25)})                
        })
    }catch(error){
        reply.send(error)
    }
}

const getAllOrders = async(req,reply)=>{
    try{
        let pageNo = 0
        let toSkip = false
        if(req.params.pageNumber){
          pageNo = req.params.pageNumber
          toSkip = true
        }

        await prisma.bookingOrder.count().then(async(length)=>{
            const data = await prisma.bookingOrder.findMany({
                take:orderRange,
                skip:toSkip ? (pageNo-1)*orderRange:0,
                include:{
                    review:true,
                    guestInfo:true,
                    paymentCard:true,
                    transaction:true,  
                }
            })
            reply.send({data,pageNumber:Math.ceil(length/25)})                
        })
    }catch(error){
     reply.send(error)
    }
}

const postOneOrder = async(req,reply)=>{
    try{
        const {propertyId,guestId,checkIn,checkOut,isForWork,firstName,secondName,
               email,specialRequest,arrivalTime,country,phoneNumber,
            cardHolderName,cardType,cardNumber,expirationDate} = req.body             
        const newOrder = await prisma.bookingOrder.create({
            data:{
                property:{
                    connect:{
                        id:propertyId
                    }
                },
                guest:{
                    connect:{
                        id:guestId,
                    }
                },
                checkIn,
                checkOut,
                isForWork:isForWork==1,
                guestInfo:{
                    create:{
                        firstName,
                        secondName,
                        email,
                        specialRequest:specialRequest ?? '',
                        arrivalTime,
                        country,
                        phoneNumber
                    }
                },
                paymentCard:{
                    create:{
                       cardHolderName,
                       cardType,
                       cardNumber,
                       expirationDate 
                    }
                }
            },
            include:{
                property:{
                    select:{
                        ownerId:true,
                        name:true,
                    }
                },
                review:true,
                guestInfo:true,
                paymentCard:true,
                transaction:true,  
            }
        })

        let result = newOrder
        let ownerId = result.property.ownerId
        let propertyName = result.property.name
        delete result.property
        sendNewNotification(ownerId,`You property ${propertyName} received one booking request.`,`Your property ${propertyName} has received one booking request make sure to check the request and accept it.` )
        
        reply.send(result)
    }catch(error){
     console.log(error)
     reply.send(error)
    }
}

const updateOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const {checkIn,checkOut,isForWork,firstName,secondName,
            email,specialRequest,arrivalTime,country,phoneNumber,
         cardHolderName,cardType,cardNumber,expirationDate} = req.body             
     const targetOrder = await prisma.bookingOrder.update({
         where:{
             id
         },
         data:{
             checkIn,
             checkOut,
             isForWork:isForWork==1,
             guestInfo:{
                 update:{
                     firstName,
                     secondName,
                     email,
                     specialRequest,
                     arrivalTime,
                     country,
                     phoneNumber
                 }
             },
             paymentCard:{
                 update:{
                    cardHolderName,
                    cardType,
                    cardNumber,
                    expirationDate 
                 }
             }
         },
         include:{
             review:true,
             guestInfo:true,
             paymentCard:true,
             transaction:true,  
         }
     })
     reply.send(targetOrder)
    }catch(error){
        console.log(error)
     reply.send(error)
    }
}

const deleteOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetOrder = await prisma.bookingOrder.delete({
            where:{
                id
            }
        })
        reply.send(targetOrder)
    }catch(error){
     reply.send(error)
    }
}

const deleteAllOrders = async(req,reply)=>{
    try{
        const result = await prisma.bookingOrder.deleteMany({})
        reply.send(result)
    }catch(error){
     reply.send(error)
    }
}

const acceptOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const updatedOrder = await prisma.bookingOrder.update({
            where:{
                id
            },
            data:{
                isAccepted:true,
                acceptionDate:new Date()
            },
            include:{
                property:{
                    select:{
                        ownerId:true,
                        name:true,
                    }
                },
            }
        })

        let result = updatedOrder
        let guestId = updatedOrder.guestId
        let propertyName = result.property.name
        delete result.property

        sendNewNotification(guestId,`Your booking request for ${propertyName} has been accepted by the owner.`,`Your booking request for ${propertyName} has accepted by the owner , don't forget to pay the bill.` )

        reply.send(result)
    }catch(error){
      reply.send(error)
    }
}

const refuseOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const {refusedReason} = req.body
        const updatedOrder = await prisma.bookingOrder.update({
            where:{
                id
            },
            data:{
                isRefused:true,
                refusedDate:new Date(),
                refusedReason,
            },
            include:{
                property:{
                    select:{
                        ownerId:true,
                        name:true,
                    }
                },
            }
        })

        let result = updatedOrder
        let guestId = updatedOrder.guestId
        let propertyName = result.property.name
        delete result.property

        sendNewNotification(guestId,`Your booking request for ${propertyName} has been refused by the owner.`,`We sadly inform you that Your booking request for ${propertyName} has refused by the owner.` )

        reply.send(result)
    }catch(error){
      reply.send(error)
    }
}

const payOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const newTransaction = await prisma.transaction.create({
            data:{
                bookingOrder:{
                    connect:{
                        id
                    }
                },
                isPaid:true,
                dateOfPaid:new Date()    
            },
            include:{
                bookingOrder:{
                    select:{
                        guestId:true,
                        property:{
                            select:{
                                ownerId:true,
                                name:true,
                            }
                        },        
                    }
                }
            }
        })

        let result = newTransaction
        let guestId = result.bookingOrder.guestId
        let propertyName = result.bookingOrder.property.name
        let ownerId = result.bookingOrder.property.ownerId
        delete result.bookingOrder

        sendNewNotification(guestId,`You successfully pay your booking request for ${propertyName}.`,`You successfully pay your booking request for ${propertyName} , hope you enjoy your journey.`)
        sendNewNotification(ownerId,`Your property ${propertyName}'s request had paid successfully.`,`Your property ${propertyName}'s request had paid successfully.` )

        reply.send(result)

        reply.send(newTransaction)
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

// here now we have cancelation policy relation from it we can get the offSet and add it to where condition
const cancelOneOrder = async(req,reply)=>{
    try{
        const propertyId = Number.parseInt(req.params.propertyId)
        const bookingId = Number.parseInt(req.params.bookingId)
        const {reasonOfCancelling} = req.body

        await prisma.property.findFirst({
            where:{
                id:propertyId
            },
            select:{
                bookingOrders:{
                    where:{
                        id:bookingId
                    },
                    select:{
                        transaction:true,
                        checkIn:true
                    }
                },
                cancellationPolicy:{
                    select:{
                        offSetMilli:true
                    }
                }
            }
        }).then(async(data)=>{
            const checkIn = data.bookingOrders[0].checkIn
            const offSet = Number.parseInt(data.cancellationPolicy.offSetMilli)
            var myDate = new Date(Date.now() + offSet)

            if(myDate<checkIn){
                const targetOrder = await prisma.bookingOrder.update({
                    where:{
                        id:bookingId
                    },
                    data:{
                        transaction:{
                            update:{
                                isCanceled:true,             
                                dateOfCanceled:new Date(),        
                                reasonOfCancelling:reasonOfCancelling 
                            }
                        }
                    }
                })
                reply.send(targetOrder)
            }

            reply.code(500).send('no')
        })
    }catch(error){
        reply.send(error)
    }
}



module.exports ={
    getOneOrder,
    getOnePropertyOrders,
    getOneClientOrders,
    getAllOrders,
    postOneOrder,
    updateOneOrder,
    deleteOneOrder,
    deleteAllOrders,
    acceptOneOrder,
    refuseOneOrder,
    payOneOrder,
    cancelOneOrder

}