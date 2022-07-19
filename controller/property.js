const {PrismaClient} = require('@prisma/client')
const { sendNewNotification } = require('../configuration/notifcationCenter')
const prisma  = new PrismaClient()
const {propertyRange} = require('../configuration/paginationRange')

const postOneProperty = async(req,reply)=>{
    try{
        const {
            ownerId,name,country,city,address,street,zipCode,numberOFSofa,space,
            cancellationPolicy,guestArrive,guestDepart,canSmoke,canHaveChildren,     
            acceptPet,acceptForeigner,price,currency,hasParking,hasBreakfast,ContactPersonName,
            countryCode,phoneNumber,numberOfBedroom,numberOfBathroom,numberOfLivingroom,type,
            images,languages,bedOptions,amenities,facilities
        } = req.body

        // creating the property object
        const newProperty = await prisma.property.create({
            data:{
                name,
                country,
                city,
                address,
                street,
                zipCode,
                numberOFSofa,
                space,
                cancellationPolicy:{
                    create:{
                        name:cancellationPolicy.name,
                        offSetMilli:cancellationPolicy.offSetMilli
                    }
                },
                guestArrive,
                guestDepart,
                canSmoke,
                canHaveChildren,
                acceptPet,
                acceptForeigner,
                price,currency,hasParking,
                hasBreakfast,
                ContactPersonName,
                countryCode,
                phoneNumber,
                numberOfBathroom,
                numberOfBedroom,
                numberOfLivingroom,
                type,
                owner:{
                    connect:{
                        id:ownerId
                    }
                },
                bedOptions:{
                    createMany:{
                            data:bedOptions 
                    }
                },
                images:{
                    create:{
                        images:{
                            createMany:{
                                data:images
                            }
                        }
                    }
                },
                languages:{
                    createMany:{
                        data:languages
                    }
                },
                amenities:{
                    createMany:{
                        data:amenities
                    }
                },
                facilities:{
                    createMany:{
                        data:facilities
                    }
                }
            },
            include:{
                bedOptions:true,
                images:{
                    select:{
                        images:true
                    }
                },
                approve:true,
                languages:true,
                amenities:true,
                facilities:true,
                bookingOrders:true                 
            }
        })

        reply.send(newProperty) 
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const getOneProperty = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetProperty = await prisma.property.findFirst({
            where:{
                id
            },
            include:{
                images:{
                    select:{
                        images:true
                    }
                },
                bedOptions:true,
                approve:true,
                amenities:true,
                facilities:true,
                languages:true,
                bookingOrders:{
                    include:{
                        review:true,
                        guestInfo:true,
                        paymentCard:true,
                        transaction:true,  
                        paymentCard:true,
                    }
                }
            }
        })
        reply.send(targetProperty)
    }catch(error){
        reply.send(error)
    }
}

const getAllApprovedProperties = async(req,reply)=>{
    try{
        let pageNo = 0
        let toSkip = false
        if(req.params.pageNumber){
          pageNo = req.params.pageNumber
          toSkip = true
        }
        await prisma.property.count({
            where:{
                approve:{
                    isApproved:true
                }
            }
        }).then(async(length)=>{
            let data = await prisma.property.findMany({
                take:propertyRange,
                skip:toSkip ? (pageNo-1)*propertyRange:0,
                where:{
                 approve:{
                    isApproved:true
                 }
                },
                include:{
                  owner:true,
                  images:{
                    select:{
                        images:{
                            select:{
                                id:true,
                                imageUrl:true
                            }
                        }
                    }
                },
                bedOptions:{
                    select:{
                        id:true,
                        kind:true,
                        numberOFBed:true
                    }
                },
                approve:{
                    include:{
                        staff:true
                    }
                },
                amenities:{
                    select:{
                        id:true,
                        name:true,
                        icon:true
                    }
                },
                facilities:{
                    select:{
                        id:true,
                        name:true,
                        icon:true
                    } 
                },
                languages:{
                    select:{
                        id:true,
                        language:true
                    }
                },
                bookingOrders:true
                }
              })
              reply.send({data,pageNumber:Math.ceil(length/propertyRange)})            
        })
    }catch(error){
        reply.send(error)
    }
}

const getAllProperties = async(req,reply)=>{  
    try{
        let pageNo = 0
        let toSkip = false
        if(req.params.pageNumber){
          pageNo = req.params.pageNumber
          toSkip = true
        }
        await prisma.property.count().then(async(length)=>{
            let data = await prisma.property.findMany({
                take:propertyRange,
                skip:toSkip ? (pageNo-1)*propertyRange:0,
                include:{
                  owner:true,
                  images:{
                    select:{
                        images:{
                            select:{
                                id:true,
                                imageUrl:true
                            }
                        }
                    }
                },
                bedOptions:{
                    select:{
                        id:true,
                        kind:true,
                        numberOFBed:true
                    }
                },
                approve:{
                    include:{
                        staff:true
                    }
                },
                amenities:{
                    select:{
                        id:true,
                        name:true,
                        icon:true
                    }
                },
                facilities:{
                    select:{
                        id:true,
                        name:true,
                        icon:true
                    } 
                },
                languages:{
                    select:{
                        id:true,
                        language:true
                    }
                },
                bookingOrders:true
                }
              })
              reply.send({data,pageNumber:Math.ceil(length/propertyRange)})            
        })
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const searchOneProperty = async(req,reply)=>{
    // list of accepted query option for searching property
    let aviableAttributes = [
        'name',
        'country',
        'city',
        'checkIn',
        'checkOut',
        'canSmoke',
        'canHaveChildren',
        'acceptForeigner',
        'acceptPet',
        'type',
        'price'
      ]
      
    try{
    
    // for pagination
    // if there is a params (pageNumber) then we activite the skip choice
    // each page has 25 records
    // we return the total number of pages with each request    
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
        pageNo = req.params.pageNumber
        toSkip = true
    }
    
  
      // getting the query from request
      const query = req.query

      // checking the accepted query . . . 
      var queryArray = Object.entries(query).filter((item)=>aviableAttributes.indexOf(item[0].toString())!=-1) 
  
      let OR = []

      let AND = {}

      let every = {}

      let where = {}
  
      // loop through our query to build up OR array
      queryArray.map((item)=>{
        let tempObj = {}
        let key = item[0]
        let value = item[1]
        // if the attribute is name then we need to use contains , same with LIKE in sql
        if(key=='name'){
          let key1 = {
            contains:value
          }
          tempObj[key] = key1
        // if the attribute is checkIn || checkOut we need to use every , to compare orders date and get avaiable room 
        }else if(key=='checkIn' || key=='checkOut'){
            if(key=='checkIn'){
                every[key]= {
               gt:new Date(value) 
             }
            }else{
                every[key]= {
                    lt:new Date(value) 
                }     
            }
        // if the atttribute is canSmoke || canHaveChildren || acceptForeigner || acceptPet we need to convert it to boolean value
        }else{
          tempObj[key] = key=='canSmoke' || key=='canHaveChildren' || key=='acceptForeigner' || key=='acceptPet' ?  value ==='true': value 
        }
        // for each loop to push one object (condition) to OR array
        OR.push(tempObj)
      })

      // checking of both the dates is exist then we add it to (AND) , otherwise we don't include (AND) to (where) object
      if(every && every.checkIn && every.checkOut){
          AND = {
          bookingOrders:{
              every
          }
        }
        where = {
            OR,
            AND
          }
    
      }else{
          where= {
              OR
          }
       
      }
      
      await prisma.property.count({
          where:{
              approve:{
                  isApproved:true
              }
          }
      }).then(async(length)=>{
        let data = await prisma.property.findMany({
          where,
          take:propertyRange,
          skip:toSkip ? (pageNo-1)*propertyRange:0,
          include:{
            owner:true,
            images:{
              select:{
                  images:true
              }
          },
          bedOptions:true,
          approve:{
              include:{
                  staff:true
              }
          },
          amenities:true,
          facilities:true,
          languages:true,
          bookingOrders:true
          }
        })
        reply.send({data,pageNumber:Math.ceil(length/propertyRange)})
      })
    }catch(err){
        reply.send(err)
    }
  }


const updateOneProperty = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.propertyId)
        const {
            name,country,city,address,street,zipCode,numberOFSofa,space,
            cancellationPolicy,guestArrive,guestDepart,canSmoke,canHaveChildren,     
            acceptPet,acceptForeigner,price,currency,hasParking,hasBreakfast,ContactPersonName,
            countryCode,phoneNumber,numberOfBedroom,numberOfBathroom,numberOfLivingroom,type,
            images,languages,bedOptions,amenities,facilities
        } = req.body

        const targetProperty = await prisma.property.update({
            where:{
                id
            },
            data:{
                name,
                country,
                city,
                address,
                street,
                zipCode,
                numberOFSofa,
                space,
                cancellationPolicy,
                guestArrive,
                guestDepart,
                canSmoke,
                canHaveChildren,
                acceptPet,
                acceptForeigner,
                price,currency,hasParking,
                hasBreakfast,
                ContactPersonName,
                countryCode,
                phoneNumber,
                numberOfBathroom,
                numberOfBedroom,
                numberOfLivingroom,
                type,
                bedOptions:{
                    upsert: bedOptions.map((option) => ({ 
                        where: { id: option.id ? option.id:-1 },
                        create: option,
                        update: option,
                    }))
                },
                images:{
                    update:{
                        images:{
                            upsert: images.images.map((image) => ({ 
                                where: { id: image.id ? image.id:-1 },
                                create: image,
                                update: image,
                            }))
                        }
                    }
                },
                languages:{
                    upsert: languages.map((language) => ({ 
                        where: { id: language.id ? language.id:-1 },
                        create: language,
                        update: language,
                    }))
                },
                amenities:{
                    upsert: amenities.map((amenity) => ({ 
                        where: { id: amenity.id ? amenity.id:-1 },
                        create: amenity,
                        update: amenity,
                    }))
                },
                facilities:{
                    upsert: facilities.map((facility) => ({ 
                        where: { id: facility.id ? facility.id : -1 },
                        create: facility,
                        update: facility,
                    }))
                }
            },
            include:{
                bedOptions:true,
                images:{
                    select:{
                        images:true
                    }
                },
                approve:true,
                languages:true,
                amenities:true,
                facilities:true,
                bookingOrders:true                 
            }
            
        })
        reply.send(targetProperty)
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const deleteOneProperty = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetProperty = await prisma.property.delete({
            where:{
                id,
            }
        })
        reply.send(targetProperty)
    }catch(error){
        reply.send(error)
    }
}

const approveProperty = async(req,reply)=>{
    try{
        const propertyId = Number.parseInt(req.params.propertyId)
        const staffId = Number.parseInt(req.params.staffId)
        const targetProperty = await prisma.propertyApproved.upsert({
            where:{
                propertyId
            },
            update:{
                approvedDate:new Date(),
                isApproved:true,
                isRefused:false,
            },
            create:{
                approvedDate:new Date(),
                isApproved:true,
                isRefused:false,
                property:{
                    connect:{
                        id:propertyId
                    }
                },
                staff:{
                    connect:{
                        id:staffId
                    }
                }
            },
            include:{
                property:{
                    select:{
                       name:true,
                       owner:{
                           select:{
                               id:true
                           }
                       }
                    }
                }
            }
        })

        // getting the ownerId and property name from result and then delete it (just for creating notification)
        let result = targetProperty
        let ownerId = result.property.owner.id
        let propertyName = result.property.name
        delete result.property

        sendNewNotification(ownerId,`Your property ${propertyName} has been accepted`,`We happy you to inform you that Your property : ${propertyName} has benn accepted , your property now will be available to public.`)
        reply.send(result)
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const disapproveProperty = async(req,reply)=>{
    try{
        const propertyId = Number.parseInt(req.params.propertyId)
        const staffId = Number.parseInt(req.params.staffId)
        const {reason} = req.body
        const targetProperty = await prisma.propertyApproved.upsert({
            where:{
                propertyId
            },
            update:{
                dateOfRefused:new Date(),
                isRefused:true,
                reasonOfRefused:reason,
                isApproved:false,
            },
            create:{
                dateOfRefused:new Date(),
                isRefused:true,
                reasonOfRefused:reason,
                isApproved:false,
                property:{
                    connect:{
                        id:propertyId
                    }
                },
                staff:{
                    connect:{
                        id:staffId
                    }
                }
            },
            include:{
                property:{
                    select:{
                       name:true,
                       owner:{
                           select:{
                               id:true
                           }
                       }
                    }
                }
              }
        })

                // getting the ownerId and property name from result and then delete it (just for creating notification)
                let result = targetProperty
                let ownerId = result.property.owner.id
                let propertyName = result.property.name
                delete result.property
        
                sendNewNotification(ownerId,`Your property ${propertyName} has been refused`,`We sadly inform you that Your property : ${propertyName} has benn refused , make sure to check refused reason before you submit your request again.`)
        
       reply.send(result)
    }catch(error){
        reply.send(error)
    }
}

module.exports = {
    postOneProperty,
    getOneProperty,
    getAllProperties,
    getAllApprovedProperties,
    updateOneProperty,
    postOneProperty,
    deleteOneProperty,
    approveProperty,
    disapproveProperty,
    searchOneProperty
}