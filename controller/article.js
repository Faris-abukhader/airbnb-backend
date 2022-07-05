const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getOneArticle = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const data = await prisma.article.findFirst({
            where:{
                id
            },
            include:{
                publisher:true,
                tags:true,
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
            }
        })
        reply.send(data)
    }catch(error){
        reply.send(error)
    }
}

const getallArticles = async(req,reply)=>{
    try{
        let pageNo = 0
        let toSkip = false
        if(req.params.pageNumber){
          pageNo = req.params.pageNumber
          toSkip = true
        }

      await prisma.article.count().then(async(length)=>{
          const data = await prisma.article.findMany({
            take:25,
            skip:toSkip ? (pageNo-1)*25:0,
            include:{
                publisher:true,
                tags:true,
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
            }
          })

          reply.send({data,pageNumber:Math.ceil(length/25)})            
      }) 
    }catch(error){
        reply.send(error)
    }
}

const postOneArticle = async(req,reply)=>{
    try{
        const {tags,title,content,description,topic,publisherId,images} = req.body
        const newArticle = await prisma.article.create({
            data:{
                title,
                description,
                content,
                images:{
                    create:{
                        images:{
                            createMany:{
                                data:images
                            }
                        }
                    }
                },
                topic,
                publisher:{
                    connect:{
                        id:publisherId
                    }
                },
                tags:{
                    createMany:{
                        data:tags
                    }
                }
            },
            include:{
                publisher:true,
                tags:true,
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
            }

        })
        reply.send(newArticle)
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const updateOneArticle = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const {tags,title,content,topic,description,images} = req.body
        const targetArticle = await prisma.article.update({
            where:{
                id
            },
            data:{
                title,
                description,
                content,
                topic,
                tags:{               
                    upsert: tags.map((tag) => ({ 
                        where: { id: tag.id ? tag.id:-1 },
                        create: tag,
                        update: tag,
                    }))
                },
                images:{
                    update:{
                        images:{
                            upsert: images.map((image) => ({ 
                                where: { id: image.id ? image.id:-1 },
                                create: image,
                                update: image,
                            }))
                        }
                    }
                },
            },
            include:{
                publisher:true,
                tags:true,
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
            }
        })
        reply.send(targetArticle)
    }catch(error){
        console.log(error)
        reply.send(error)
    }
}

const deleteOneArticle = async(req,reply)=>{
    try{
        const id = Number.parseInt(req.params.id)
        const targetArticle = await prisma.article.delete({
            where:{
                id
            }
        })
        reply.send(targetArticle)
    }catch(error){
        reply.send(error)
    }
}

const deleteAllArticles = async(req,reply)=>{
    try{
        const result = await prisma.article.deleteMany({})
        reply.send(result)
    }catch(error){
        reply.send(error)
    }
}

module.exports = {
    getOneArticle,
    getallArticles,
    postOneArticle,
    updateOneArticle,
    deleteOneArticle,
    deleteAllArticles
}