const {sendOneNotification} = require('../controller/notification')
const queue = require('fastq').promise(sendOneNotification, 1)


const sendNewNotification = async(recieverId,title,content)=>{
    await queue.push({recieverId,title,content})
}

module.exports = {
    sendNewNotification
}