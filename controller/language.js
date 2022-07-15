const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {languageRange} = require('../configuration/paginationRange')


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
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }

    try{
        await prisma.language.count().then(async(length)=>{
            const data = await prisma.language.findMany({
                take:languageRange,
                skip:toSkip ? (pageNo-1)*languageRange:0,
            })
            reply.send({data,pageNumber:Math.ceil(length/25)})                
        })
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
     const languages = await prisma.language.createMany({data})
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

const deleteManyLanguages = async(req,reply)=>{
    try{
        const {ids} = req.body
        const targetLanguages = await prisma.language.deleteMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
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
    deleteAllLanguages,
    deleteManyLanguages
}