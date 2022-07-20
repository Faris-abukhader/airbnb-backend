const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signInAdmin = (req, reply) => {
    try{
         const {email,password} = req.body

          prisma.user.findUnique({
             where:{
                 email,
             },
             include:{
                 admin:{
                     select:{
                         firstName:true,
                         secondName:true,
                         image:true,
                         password:true
                     }
                 }
             }
         }).then((admin)=>{
             console.log(admin)
            
            bcrypt.compare(password, admin.admin.password,function(err, result) {

                if(err) throw err

                if(result){
                   var token = jwt.sign({ email }, process.env.JWT_SECRET);
                  
                   // getting data from admin object except (password)
                   let result = admin
                   result.firstName = admin.admin.firstName
                   result.secondName = admin.admin.secondName
                   result.image = admin.admin.image
                   result.token = token
                   delete result.admin

                   reply.send(result)
                }else{
                   reply.code(401).send({message:'Unauthorized request.'})
                }
            });
         })
    }catch(error){
        console.log(error)
        reply.send(error)
    }

}


  module.exports = {
    signInAdmin  
}
  