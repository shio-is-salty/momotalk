const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const http = require('http')
const { Server } =  require('socket.io')
require('dotenv').config()

// models
const UserModel = require("./models/User")
const MessageModel = require("./models/Message")

// constants
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const JWT_SECRET = process.env.JWT_SECRET


// salt
const bcryptSalt = bcrypt.genSaltSync(10)

// middlewares
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://192.168.2.225:5173',
}))
app.use(cookieParser())
app.use('/assets', express.static(__dirname+'/assets'))

// connect to db
mongoose.connect(MONGO_URL)

// socket
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://192.168.2.225:5173',
    }
})

server.listen(4001, () => {
    console.log('SERVER IS RUNNING')

})

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })
})


// routes

app.post('/signup', async (req, res) => {
    const {username, password} = req.body
    const iconList = ['utaha.png', 'neru.png', 'shizuko.png', 'haruka.png', 'shimiko.png',
    'airi.png', 'nodoka.png', 'tsurugi.png', 'izuna.png', 'aru.png', 'hina.png', 'koharu.png',
    'serika.png', 'nonomi.png', 'alice.png', 'shiroko.png', 'ayane.png', 'momoi.png', 'hibiki.png',
    'mutsuki.png', 'junko.png', 'kayoko.png', 'hoshino.png', 'hasumi.png', 'arona.png', 'yoshimi.png',
    'sumire.png', 'karin.png', 'fuuka.png', 'cherino.png', 'juri.png', 'midori.png', 'tsubaki.png',
    'saya.png', 'chinatsu.png', 'akane.png', 'serina.png', 'iori.png', 'hifumi.png', 'yuuka.png', 
    'kotori.png', 'hanako.png', 'yuzu.png', 'hare.png', 'shun.png', 'akari.png', 'izumi.png', 'suzumi.png',
    'chise.png', 'eimi.png', 'azusa.png', 'kotama.png', 'pina.png', 'asuna.png', 'maki.png', 'haruna.png',
    'hanae.png', 'mashiro.png'].sort()

    const randomIcon = Math.floor(Math.random() * iconList.length)

    try{
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, bcryptSalt),
            icon: iconList[randomIcon]
        })

        if(!userDoc){
            res.json('Failed to create account')
            return
        }
        
        jwt.sign({username:userDoc.username, id:userDoc._id, icon:userDoc.icon}, JWT_SECRET, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json(userDoc)
        })
    }catch(e){
        res.json(e)
    }

})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const userDoc = await UserModel.findOne({username})
  
    if(!userDoc){
      res.status(422).json("Username doesn't exist!")
      return
    }
  
    const passOk = bcrypt.compareSync(password, userDoc.password)
  
    if(!passOk){
      res.status(422).json('Incorrect Password!')
      return
    }
  
    if(passOk){
      jwt.sign({username:userDoc.username,id:userDoc._id,icon:userDoc.icon}, JWT_SECRET, {}, (err, token) => {
        if(err) throw err
        res.cookie('token', token).json(
            {
                username: userDoc.username,
                id: userDoc._id,
                icon:userDoc.icon,
            })
    })
  
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token','').json(true)
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies

    if(!token){
        res.json(null)
    }
    
    if(token){
        jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
            if(err) throw err
            const {username, id, icon} =  await UserModel.findById(userData.id)
            res.json({username, id, icon})
        })
    }


})

app.post('/send_message', async(req, res) => {
    const {text, sender, room} = req.body
    try{
        const messageDoc = await MessageModel.create({
            text, sender, room 
        })
        res.json(messageDoc)
    }catch(e){
        res.status(422).json("Failed to send message")
    }

})

app.post('/messages', async(req, res) => {
    const {room} = req.body
    console.log(room)
    try{
        const messagesDoc = await MessageModel.find({room}).populate('sender')
        res.json(messagesDoc)
    }catch(e){
        res.status(422).json('Failed to get messages')
    }

})

app.post('/update-profile', async(req, res) => {
    const {id, icon} = req.body
    try{
        const userDoc = await UserModel.updateOne({_id:id}, {icon})
        res.json(userDoc)

    }catch(e){
        res.status(422).json('Failed to update profile')
    }
})

app.listen(PORT, () => {
    console.log('connected at port: 4000')
})

