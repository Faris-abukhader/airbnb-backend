const s3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION
const AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY

const s3 = new s3({
    region:AWS_BUCKET_REGION,
    accessKeyId:AWS_ACCESS_KEY,
    secretAccessKey:AWS_SECRET_KEY
})

const uploadFile = ()=>{

}
