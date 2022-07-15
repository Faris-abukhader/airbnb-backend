const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {articleTopicRange} = require('../configuration/paginationRange')


const getArticleTopic = async(req, reply) => {
    try{
         const id = Number.parseInt(req.params.id)
         const data = await prisma.articleTopic.findFirst({
             where:{
               id
             }
         })
     reply.send(data)
    }catch(error){
        reply.send(error)
    }

}

const getAllArticleTopics = async(req, reply) => {
    let pageNo = 0
    let toSkip = false
    if(req.params.pageNumber){
      pageNo = req.params.pageNumber
      toSkip = true
    }
    try{
        await prisma.articleTopic.count().then(async(length)=>{
          const data = await prisma.articleTopic.findMany({
            take:articleTopicRange,
            skip:toSkip ? (pageNo-1)*articleTopicRange:0,
          })
          reply.send({data,pageNumber:Math.ceil(length/25)})                
        })
    }catch(error){
        reply.send(error)
    }
}


const postArticleTopic = async(req, reply) => {
    try{
        const {title} = req.body
        const data = await prisma.articleTopic.create({data:{title}})
        reply.send(data)
    }catch(error){
        reply.send(error)
    }
}


const postManyArticleTopics = async(req, reply) => {
    try{
        const {data} = req.body
        const response = await prisma.articleTopic.createMany({data:data})
        reply.send(response)
    }catch(error){
        reply.send(error)
    }
}

const updateOneArticle = async(req,reply)=>{
    try{
        const {id,title} = req.body
        const data = await prisma.articleTopic.update({
            where:{
                id
            },
            data:{
                title
            }
        })
        reply.send(data)
    }catch(error){
        reply.send(error)
    }
}


const deleteArticleTopic = async(req, reply) => {
    try{
        const {id} = req.body
        const data = await prisma.articleTopic.delete({where:{id}})
        reply.send(data)
    }catch(error){
        reply.send(error)
    }
}

const deleteAllArticleTopics = async(req, reply) => {
    try{
        const data = await prisma.articleTopic.deleteMany({})
        reply.send(data)
    }catch(error){
        reply.send(error)
    }
}

const deleteManyArticleTopic = async(req,reply)=>{
    try{
        const {ids} = req.body
        const data = await prisma.articleTopic.deleteMany({
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
    getArticleTopic,
    getAllArticleTopics,
    postArticleTopic,
    postManyArticleTopics,
    updateOneArticle,
    deleteArticleTopic,
    deleteAllArticleTopics,
    deleteManyArticleTopic
  }
  