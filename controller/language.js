const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getOneLanguage = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetLanguage = await prisma.language.findFirst({
            where:{
                id
            }
        })
        reply.send(targetLanguage)
    }catch(err){
        reply.send(err)
    }
}

const getAllLanguages = async(req,reply)=>{
    try{
        const targetLanguages = await prisma.language.findMany({})
        reply.send(targetLanguages)
    }catch(err){
        reply.send(err)
    }
}

const createOneLanguage = async(req,reply)=>{
    try{
        const {name} = req.body
        const newLanguage = await prisma.language.create({
            data:{
                name
            }
        })
        reply.send(newLanguage)
    }catch(err){
        reply.send(err)
    }
}

const createManyLanguages = async(req,reply)=>{
    try{
     const {data} = req.body
     const languages = await prisma.language.createMany(data)
     reply.send(languages)
    }catch(err){
        reply.send(err)
    }
}

const updateOneLanguage = async(req,reply)=>{
    try{
      const id = Number.parseInt(req.params.id)
      const {name} = req.body
      const language = await prisma.language.update({
          where:{
              id
          },
          data:{
              name
          }
      })
      reply.send(language)
    }catch(err){
        reply.send(err)
    }
}

const deleteOneLanguage = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetLanguage = await prisma.language.delete({
            where:{
                id
            }
        })
        reply.send(targetLanguage)
    }catch(err){
        reply.send(err)
    }
}

const deleteAllLanguages = async(req,reply)=>{
    try{
        const targetLanguages = await prisma.language.deleteMany({})
        reply.send(targetLanguages)
    }catch(err){
        reply.send(err)
    }
}

module.exports = {
    getOneLanguage,
    getAllLanguages,
    createOneLanguage,
    createManyLanguages,
    updateOneLanguage,
    deleteOneLanguage,
    deleteAllLanguages
}