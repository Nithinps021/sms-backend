const express = require('express')
const cors = require('cors');
const twilio = require('twilio')('ACca1360422cf1921e8242ae08138816a0','cc93ac884dcb2f5e4edbe784e2535939')

const app = express()
const port =8080


app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.listen(process.env.PORT || port, () => console.log(`Hello world app listening on port ${port}!`))


function sendMessage (details){
    return new Promise((resolve,reject)=>{
        twilio.messages.create({
            body:details.message,
            from:"+12312992030",
            to:details.phoneno
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
app.post('/send',(req,res)=>{
    console.log(req.body)
    sendMessage(req.body)
    .then(data=>{
        res.json(data)
    })
    .catch(error=>{
        res.json(error)
    })
})

app.get('/',(req,res)=>{
    const details ={
        message:"hello"
    }
    res.json(details)
})

