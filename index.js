const express = require('express')
const cors = require('cors');
const twilio = require('twilio')('ACca1360422cf1921e8242ae08138816a0','cc93ac884dcb2f5e4edbe784e2535939')

const app = express()
const port =8080


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
app.use(cors({
    origin: '*'
}));

function sendMessage (){
    return new Promise((resolve,reject)=>{
        twilio.messages.create({
            body:"hi message from nithin",
            from:"+12312992030",
            to:"+918078157978"
        })
        .then(res=>{
            resolve({
                status:200,
                messages:"message is send",
                res,
            })
        })
        .catch(error=>{
            reject ({
                status:404,
                messages:"something went wrong",
                error
            })
        })
    })
}
app.get('/send',(req,res)=>{
    sendMessage()
    .then(data=>{
        res.json(data)
    })
    .catch(error=>{
        res.statusCode(400)
        res.json(error)
    })
})

app.get('/',(req,res)=>{
    const details ={
        message:"hello"
    }
    res.json(details)
})

