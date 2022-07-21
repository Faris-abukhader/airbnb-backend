const amenityObject = {
    type: 'object',
    properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    icon: { type: 'string' },
    },
}

const articleTopicObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
    },
  }

  const clientObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string' },
      secondName: { type: 'string' },
      image: { type: 'string' },
      createdAt:{type:'string'},
      lastUpdate:{type:'string'}
    },
  }

  const facilityObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      icon: { type: 'string' },
    },
  }

  const languageObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  }

  const notificationObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      senderId: { type: 'integer' },
      recieverId: { type: 'integer' },
      title: { type: 'string' },
      content: { type: 'string' },
      isSeen: { type: 'integer' },
      createdAt:{type:'string'}
    },
  }

  
  const bedOptionsObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      kind: { type: 'string' },
      numberOFBed: { type: 'integer' },
    },
  }

  const imageObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      imageSetId: { type: 'integer' },
      imageUrl: { type: 'string' },
    },
  }

  const imageSetObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      articleId: { type: 'integer' },
      propertyId: { type: 'integer' },
      images:{
        type:'array',
        items:imageObject
      },
      createdAt: { type: 'string' },
    },
  }

  const staffObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string' },
      secondName: { type: 'string' },
      image: { type: 'string' },
      createdAt:{type:'string'},
      lastUpdate:{type:'string'}
    },
  }


  const userObject = {
    type: 'object',
    properties: {
      id:{type:'integer'},
      email: { type: 'string' },
      firstName:{type:'string'},
      secondName:{type:'string'},
      image:{type:'string'},
      createdAt:{type:'string'},
      lastUpdate:{type:'string'},
    },
  }


  const approvePropertyObject ={
    type:'object',
    properties:{
      id: { type: 'integer' },
      propertyId: { type: 'integer' },
      staffId: { type: 'integer' },
      staff:staffObject,
      isApproved: { type: 'integer' },
      approvedDate: { type: 'string' },
      isRefused: { type: 'integer' },
      reasonOfRefused: { type: 'string' },
      dateOfRefused: { type: 'string' },
      createdAt: { type: 'string' },
      lastUpdate: { type: 'string' },
    }
  }

  const propertyObject = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      ownerId: { type: 'integer' },
      name: { type: 'string' },
      country: { type: 'string' },
      city: { type: 'string' },
      address: { type: 'string' },
      street: { type: 'string' },
      zipCode: { type: 'string' },
      numberOFSofa: { type: 'integer' },
      space: { type: 'integer' },
      cancellationPolicy: { type: 'string' },
      guestArrive: { type: 'string' },
      guestDepart: { type: 'string' },
      canSmoke: { type: 'integer' },
      canHaveChildren: { type: 'integer' },     
      acceptPet: { type: 'integer' },
      acceptForeigner: { type: 'integer' },
      price: { type: 'integer' },
      currency: { type: 'string' },
      hasParking: { type: 'integer' },
      hasBreakfast: { type: 'integer' },
      ContactPersonName: { type: 'string' },
      countryCode: { type: 'string' },
      phoneNumber: { type: 'string' },
      numberOfBedroom: { type: 'integer' },
      numberOfBathroom: { type: 'integer' },
      numberOfLivingroom: { type: 'integer' },
      type: { type: 'string' },
      owner:clientObject,
      bedObtions:bedOptionsObject,
      images:imageSetObject,
      languages:{
        type:'array',
        items:languageObject
      },
      amenities:{
        type:'array',
        items:amenityObject
      },
      facilities:{
        type:'array',
        items:facilityObject
      },
      approve:approvePropertyObject
    },
  }

  const tagObject = {
    type:'object',
    properties:{
        id: { type: 'integer' },
        name: { type: 'string' },  
    }
  }


  const propertyTypeObject = {
    type:'object',
    properties:{
        id: { type: 'integer' },
        name: { type: 'string' },  
    }
  }


  const articleObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      topic:{type:'string'},                           
      tags:{
        type:'array',
        items:tagObject
      },                            
      images:imageSetObject,                         
      content:{type:'string'},                         
      title:{type:'string'},                           
      description:{type:'string'},                    
      publisherId:{type:'integer'},                    
      publisher:staffObject,                     
      seenNumber:{type:'integer'},                      
      createdAt:{type:'string'},                       
      lastUpdate:{type:'string'},         
    }
  }

  const guestInofObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      bookingId:{type:'integer'},                           
      firstName:{type:'string'},                           
      secondName:{type:'string'},                    
      email:{type:'string'},                       
      specialRequest:{type:'string'}, 
      arrivalTime:{type:'string'}, 
      country:{type:'string'}, 
      phoneNumber:{type:'string'}, 
    }
  }

  const orderReviewObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      bookingId:{type:'integer'},                           
      stars:{type:'integer'},                           
      content:{type:'string'},                    
      createdAt:{type:'string'},                       
      lastUpdate:{type:'string'}, 
    }
  }

  const paymentCardObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      bookingId:{type:'integer'},                           
      cardType:{type:'string'},                           
      cardNumber:{type:'string'},                    
      expirationDate:{type:'string'},                    
    }
  }

  const transactionObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      bookingId:{type:'integer'},                           
      isPaid:{type:'integer'},                           
      dateOfPaid:{type:'string'},                    
      isCanceled:{type:'integer'},                    
      dateOfCanceled:{type:'string'},                       
      reasonOfCancelling:{type:'string'}, 
      createdAt:{type:'string'},                       
      lastUpdate:{type:'string'}, 
    }
  }

  const cancelOptionObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      name:{type:'string'},                           
      offSetMilli:{type:'integer'},                           
    }
  }


  const bookingOrderObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      propertyId:{type:'integer'}, 
      guestId:{type:'integer'},                          
      checkIn:{type:'string'},                           
      checkOut:{type:'string'},                    
      isForWork:{type:'integer'},                    
      createdAt:{type:'string'},                       
      lastUpdate:{type:'string'}, 
      isAccepted:{type:'integer'}, 
      acceptionDate:{type:'string'}, 
      isRefused:{type:'integer'}, 
      refusedDate:{type:'string'}, 
      refusedReason:{type:'string'}, 
      review:orderReviewObject,
      guestInfo:guestInofObject,
      paymentCard:paymentCardObject,
      transaction:transactionObject, 
    }
  }

  const adminObject = {
    type:'object',
    properties:{
      id:{type:'integer'},                    
      firstName:{type:'string'}, 
      secondName:{type:'string'},                          
      email:{type:'string'},                           
      image:{type:'string'},                    
      createdAt:{type:'string'},                       
      lastUpdate:{type:'string'}, 
    }
  }


module.exports = {
    amenityObject,
    articleTopicObject,
    clientObject,
    facilityObject,
    languageObject,
    notificationObject,
    propertyObject,
    staffObject,
    userObject,
    articleObject,
    tagObject,
    imageObject,
    bookingOrderObject,
    orderReviewObject,
    guestInofObject,
    paymentCardObject,
    transactionObject,
    cancelOptionObject,
    propertyTypeObject,
    adminObject,
}
