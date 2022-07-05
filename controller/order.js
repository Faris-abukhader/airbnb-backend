const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

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
       console.log('property id is : '+propertyId)

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
                bookingOrders:true
            }
        })
        reply.send({data,pageNumber:Math.ceil(length/25)})                
    })

    //    await prisma.bookingOrder.count({
    //        where:{
    //            propertyId
    //        }
    //    }).then(async(length)=>{
    //        const data = await prisma.bookingOrder.findMany({
    //            where:{
    //                propertyId
    //            },
    //            take:25,
    //            skip:toSkip ? (pageNo-1)*25:0,
    //            include:{
    //             review:true,
    //             guestInfo:true,
    //             paymentCard:true,
    //             transaction:true,   
    //            }
    //        })
    //        reply.send({data,pageNumber:Math.ceil(length/25)})                
    //     })
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
                take:25,
                skip:toSkip ? (pageNo-1)*25:0,
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
                take:25,
                skip:toSkip ? (pageNo-1)*25:0,
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
        const {propertyId,checkIn,checkOut,isForWork,firstName,secondName,
               email,specialRequest,arrivalTime,country,phoneNumber,
            cardHolderName,cardType,cardNumber,expirationDate} = req.body             
        const newOrder = await prisma.bookingOrder.create({
            data:{
                property:{
                    connect:{
                        id:propertyId
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
                review:true,
                guestInfo:true,
                paymentCard:true,
                transaction:true,  
            }
        })
        reply.send(newOrder)
    }catch(error){
     console.log(error)
     reply.send(error)
    }
}

const updateOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        console.log('the order id is :'+id)
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
     console.log(targetOrder)
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
            }
        })
        reply.send(updatedOrder)
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
            }
        })
        reply.send(updatedOrder)
    }catch(error){
      reply.send(error)
    }
}

const payOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const updatedOrder = await prisma.bookingOrder.update({
            where:{
                id
            },
            data:{
                transaction:{
                    create:{
                        isPaid:true,
                        dateOfPaid:new Date(),
                    }
                }
            }
        })
        reply.send(updatedOrder)
    }catch(error){
        reply.send(error)
    }
}

const cancelOneOrder = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const {reasonOfCancelling} = req.body

        var dateOffset = (24*60*60*1000) * 1; //one day
        var myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        const updatedOrder = await prisma.bookingOrder.upsert({
            where:{
                checkIn:{
                    lt:myDate
                }
            },
            update:{
                transaction:{
                    update:{
                        isCanceled:true,
                        dateOfCanceled:new Date()
                    }
                }
            },
            include:{

            }
        })
        reply.send(updatedOrder)
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