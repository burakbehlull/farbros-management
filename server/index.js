import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import { Client } from "discord.js"

import { DB } from './config/index.js'
import { Base } from './helpers/index.js'
import { apiRouter } from './routers/index.js'
import { Misc } from './helpers/index.js'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.use(cors({
    origin: true,
	credentials: true
}))
app.use(morgan('dev'))

DB()


export const IBot = new Base(new Client({
	intents: new Misc().IntensAll()
}))

app.get('/',(req, res)=>{
    res.send('hello farbros')
})

app.use('/api', apiRouter)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is ${process.env.PORT} port started`)
})