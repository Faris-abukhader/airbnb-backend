const {verify} = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.token
        verify(token,process.env.JWT_SECRET,async(err,decode)=>{
            if(err) res.code(401).send(err)
            try{
                const email = decode.email
                const user = await prisma.user.findUnique({where:{email}})
                if(user == null || user == undefined) {
                    res.code(404).send({stateCode:404,message:'user is not found'})
                }
            }catch(err){
                res.code(500).send({stateCode:404,message:'user is not found'})
            }            
         })
    
      }catch(err){
        res.code(401).send(err)
      }
      next()
    }