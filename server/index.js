const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const env = require('dotenv')
const jwt = require('jsonwebtoken')

const User = require('./models/user.model')
const Event = require('./models/event.model')


const app = express()

const PORT = 1337
env.config()
const mongoPasswd = process.env.mongoPasswd
const emailPasswd = process.env.emailPasswd
const tokenSecret = process.env.tokenSecret

// import { model } from './models/user.model.js'

// app.use(express.bodyParser({limit: '50mb'}));

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json({limit: '50mb'}))


// mongoose.connect('mongodb://localhost:27017/mern-codedamn/')
// mongoose.connect(`mongodb+srv://arca:NoThisIsNotThePassword@cluster0.u3yxkz3.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connect(`mongodb+srv://arca:${mongoPasswd}@cluster0.u3yxkz3.mongodb.net/?retryWrites=true&w=majority`)

app.post('/api/register', async (req,res) => {
    console.log('Registering user...');
    console.log(req.body);

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // verfied: false,
            quote: ''
        })
        
        res.json({status:'ok'}) // send back a response to the client

    } catch (error) {
        res.json({status:'error', error:error})
        console.log(error);
    }


    // res.send("hello world!") 
})

app.get('/api/events', async (req,res) => {
    console.log('verifying user...');
    console.log(req.headers);

    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, tokenSecret)
        // console.log(decoded);

        const user = await User.findOne({email: decoded.email})
        
        if(user){
            var organizer = false
            console.log('printing user obj');
            // console.log(user);
            console.log(JSON.stringify(user.name));
            if(user.admin == 1){
                console.log('is organizer.');
                organizer = true
            }
            
            console.log('User found');

            const eventList = await Event.find({})

            // console.log(JSON.stringify(eventList));
            res.json({ status:'ok', organizer: organizer, events: eventList, }) // send back a response to the client
        }else{
            console.log('User not found');
            res.json({status: 'error', error: 'User not found'})
        }

    }
    catch (error) {
        res.json({status: 'error', error: 'error occurred. see logs.'})
        console.log(error);
    }
})

app.post('/api/users', async (req, res) => {
    // verify if token is valid and return username

    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, tokenSecret)
    // console.log(decoded);

    const user = await User.findOne({email: decoded.email})
    // console.log(user);

    if(user){
        console.log('User found');
        res.json({status: 'ok', user: {
                name: user.name, email: user.email
            }
        })

    }else{
        console.log('User not found');
        res.json({status: 'error', error: 'User not found'})
    }

})

app.post('/api/verifyEmail', async (req,res) => {
    console.log('Verifying email...');
    console.log(req.body);

    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            console.log('User found!');
            if(user.password === req.body.password){
                console.log('Password correct!');
                const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1h'})
                res.json({status:'ok', token: token})
            }else{
                console.log('Password incorrect!');
                res.json({status:'error', error:'Password incorrect!'})
            }
        }else{
            console.log('User not found!');
            res.json({status:'error', error:'User not found!'})
        }
        
    } catch (error) {
        res.json({status:'error', error:error})
        console.log(error);
    }
})

app.post('/api/createEvent', async (req,res) => {
    console.log('Creating event...');
    console.log(req.body);

    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, tokenSecret)
        // console.log(decoded);

        const user = await User.findOne({email: decoded.email})
        // console.log(user);

        if(user){
            if(req.body.creator.email === user.email){
                console.log('User found');
                const event = new Event({
                    name: req.body.name,
                    description: req.body.description,
                    startDate: req.body.startDate,
                    startTime: req.body.startTime,
                    colors: req.body.colors,
                    creator: req.body.creator,
                    image: req.body.image,
                })
    
                await event.save()
                res.json({status: 'ok', event: event})
            }else{
                res.json({status: 'error', error: 'fraudulentAttempt', message: 'You are not authorized to create an event for this user.'})
            }

        }else{
            console.log('User not found');
            res.json({status: 'error', error: 'User not found'})
        }

    } catch (error) {
        res.json({status: 'error', error: error})
        console.log(error);
    }
})



// app.get('/mongoTest', async (req,res) => {
//     try {
//         const user = await User.findOne({
//             email:'admin@a.c',
//             password:'admin',
//         })
//         if(user) {
//         res.json(user)
//     } catch (error) {
//         console.log(error);
//     }
        
// }


app.post('/api/login', async (req,res) => {
    console.log('Loggin in...')
    // console.log(req.headers);
    console.log(req.body);
    // console.log(req)

    try {
        const user = await User.findOne({ 
            email: req.body.email,
            password: req.body.password,
        })

        var response = {}
        
        if(user){
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                }, tokenSecret
            )

            response = ({
                status:'ok',
                user: token,
            })
            console.log('token generated and sent.')
        }else{
            response = ({
                status:'error',
                user: false,
            })
        }

        // response = { status: 'ok' , response } // send back a response to the client
        res.json(response)
    } catch (error) {
        res.json({status:'error', error:'Unable to connect'})
        console.log(error);
    }


    // res.send("hello world!") 
})

app.post('/api/checkEmailExists', async (req,res) => {
    console.log('Checking if email exists...')
    // console.log(req.headers);
    console.log(req.body);
    // console.log(req)

    try {
        const user = await User.findOne({ 
            email: req.body.email,
        })

        var response = {}
        
        if(user){
            response = ({
                status:'ok',
                exists: true,
            })
            console.log('Email exists.')
        }else{
            response = ({
                status:'ok',
                exists: false,
            })
            console.log('Email does not exist.')
        }

        // response = { status: 'ok' , response } // send back a response to the client
        res.json(response)
    } catch (error) {
        res.json({status:'error', error:'Unable to connect'})
        console.log(error);
    }
})

app.get('/api/dashboard', async (req,res) => {

})

// app.get('/api/quotes', async (req,res) => {
//     console.log('quote requested')
//     // console.log(req.body);

//     try {
//         // console.log(`headers : ${JSON.stringify(req.headers)}`);
//         // console.log(`header : ${req.header}`);
        
//         const token = req.headers['x-access-token']

//         // console.log(`token : ${token}`);
        
//         // req.body.Authorization = req.body.Authorization.replace('Bearer ', '')
//         const decoded = jwt.verify(token, tokenSecret)
//         console.log(decoded);

//         const email = decoded.email

//         const user = await User.findOne({ email: email })

//         // if(user){
//         //     res.json({
//         //         status: 'ok',
//         //         quotes: user.quotes,
//         //     })
//         // }

//         if(decoded){
//             console.log('token verified');

//             const quoteList = {
//                 text: 'The way to get started is to quit talking and begin doing.',
//             }

//             // const quoteList = { quotes: [
//             //     {
//             //         text: 'The way to get started is to quit talking and begin doing.',
//             //     },
//             //     {
//             //         text: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.',
//             //     },
//             //     {
//             //         text: 'Dont let yesterday take up too much of today.',
//             //     },
//             //     {
//             //         text: 'You learn more from failure than from success. Dont let it stop you. Failure builds character.',
//             //     },
//             //     {
//             //         text: 'Its not whether you get knocked down, its whether you get up.',
//             //     },
//             //     {
//             //         text: 'If you are working on something that you really care about, you dont have to be pushed. The vision pulls you.',
//             //     },
//             //     {
//             //         text: 'People who are crazy enough to think they can change the world, are the ones who do.',
//             //     },
//             // ] }
//             // console.log('logging quotes')
//             // console.log(quoteList)

//             res.status(200).json(quoteList)
//             console.log('quotes sent')
//         }else{
//             console.log('token not verified');
//             res.json({status:'error', error:'Please login again', redirection: '/login'})
//         }

//     } catch (error) {
//         console.log(error);
//     }
        
// })

// app.get('/api/quotes', async (req,res) => {
//     /// Simulator code

//     console.log('quote requested')

//     res.json({ status: 'ok', quotes: 'some good quote here' })
// })

app.get('/api/quotes', async (req,res) => {
    console.log('quote requested')
    // console.log(req.body);

    try {
        // console.log(`headers : ${JSON.stringify(req.headers)}`);
        // console.log(`header : ${req.header}`);
        
        const token = req.headers['x-access-token']

        // console.log(`token : ${token}`);
        
        // req.body.Authorization = req.body.Authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, tokenSecret)
        console.log(decoded);

        const email = decoded.email

        const user = await User.findOne({ email: email })

        console.log(user.quote)

        res.json({status: 'ok', quotes: user.quote})

        // if(user){
        //     res.json({
        //         status: 'ok',
        //         quotes: user.quotes,
        //     })
        // }

        // if(decoded){
        //     console.log('token verified');

        //     const quoteList = {
        //         text: 'The way to get started is to quit talking and begin doing.',
        //     }

        //     // const quoteList = { quotes: [
        //     //     {
        //     //         text: 'The way to get started is to quit talking and begin doing.',
        //     //     },
        //     //     {
        //     //         text: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.',
        //     //     },
        //     //     {
        //     //         text: 'Dont let yesterday take up too much of today.',
        //     //     },
        //     //     {
        //     //         text: 'You learn more from failure than from success. Dont let it stop you. Failure builds character.',
        //     //     },
        //     //     {
        //     //         text: 'Its not whether you get knocked down, its whether you get up.',
        //     //     },
        //     //     {
        //     //         text: 'If you are working on something that you really care about, you dont have to be pushed. The vision pulls you.',
        //     //     },
        //     //     {
        //     //         text: 'People who are crazy enough to think they can change the world, are the ones who do.',
        //     //     },
        //     // ] }
        //     // console.log('logging quotes')
        //     // console.log(quoteList)

        //     res.status(200).json(quoteList)
        //     console.log('quotes sent')
        // }else{
        //     console.log('token not verified');
        //     res.json({status:'error', error:'Please login again', redirection: '/login'})
        // }

    } catch (error) {
        console.log(error);
    }
        
})

app.post('/api/quotes', async (req,res) => {
    console.log('quote requested')
    // console.log(req.body);

    try {
        // console.log(`headers : ${JSON.stringify(req.headers)}`);
        // console.log(`header : ${req.header}`);
        
        const token = req.headers['x-access-token']

        // console.log(`token : ${token}`);
        
        // req.body.Authorization = req.body.Authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, tokenSecret)
        console.log(decoded);

        const email = decoded.email

        const user = await User.updateOne({ email: email }, { $set : {quote: req.body.newQuote} })

        res.json({status: 'ok'})

        // if(user){
        //     res.json({
        //         status: 'ok',
        //         quotes: user.quotes,
        //     })
        // }

        // if(decoded){
        //     console.log('token verified');

        //     const quoteList = {
        //         text: 'The way to get started is to quit talking and begin doing.',
        //     }

        //     // const quoteList = { quotes: [
        //     //     {
        //     //         text: 'The way to get started is to quit talking and begin doing.',
        //     //     },
        //     //     {
        //     //         text: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.',
        //     //     },
        //     //     {
        //     //         text: 'Dont let yesterday take up too much of today.',
        //     //     },
        //     //     {
        //     //         text: 'You learn more from failure than from success. Dont let it stop you. Failure builds character.',
        //     //     },
        //     //     {
        //     //         text: 'Its not whether you get knocked down, its whether you get up.',
        //     //     },
        //     //     {
        //     //         text: 'If you are working on something that you really care about, you dont have to be pushed. The vision pulls you.',
        //     //     },
        //     //     {
        //     //         text: 'People who are crazy enough to think they can change the world, are the ones who do.',
        //     //     },
        //     // ] }
        //     // console.log('logging quotes')
        //     // console.log(quoteList)

        //     res.status(200).json(quoteList)
        //     console.log('quotes sent')
        // }else{
        //     console.log('token not verified');
        //     res.json({status:'error', error:'Please login again', redirection: '/login'})
        // }

    } catch (error) {
        console.log(error);
    }
        
})

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})