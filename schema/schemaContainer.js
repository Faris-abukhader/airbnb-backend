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
      role:{type:'string'}
    },
  }



  /*

    id                  Int         @id @default(autoincrement())
  propertyId          Int @unique
  staffId             Int
  staff               Staff @relation(fields: [staffId],references: [id])
  property            Property @relation(fields: [propertyId],references: [id])
  isApproved          Boolean?
  approvedDate        DateTime?
  isRefused           Boolean? @default(false)
  reasonOfRefused     String? @default("")
  dateOfRefused       DateTime?
  createdAt           DateTime @default(now())
  lastUpdate          DateTime @updatedAt

  */

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


module.exports = {
    amenityObject,
    articleTopicObject,
    clientObject,
    facilityObject,
    languageObject,
    notificationObject,
    propertyObject,
    staffObject,
    userObject
}
