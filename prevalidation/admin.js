const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {verify} = require('jsonwebtoken')

const adminMiddleware = async(req,res,next)=>{
    const token = req.headers.token
    verify(token,process.env.JWT_SECRET,async(err, decoded)=>{

        if(err) res.send(err)
         
        try{
            const targetClient = await prisma.user.findFirst({
                where:{
                    email:decoded.email,
                    role:'admin'
                }
            }) 

            if(!targetClient) res.code(401).send("Unothorize request") 

            next() 
        }catch(err){
           res.send(err)
        }
    })      
}



module.exports = adminMiddleware