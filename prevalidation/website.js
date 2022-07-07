const {verify} = require('jsonwebtoken')

const websiteMiddleware = async(req,res,next)=>{
    const token = req.headers.token
    verify(token,process.env.JWT_SECRET,async(err, decoded)=>{

        if(err) res.send(err)
    })      
}



module.exports = websiteMiddleware