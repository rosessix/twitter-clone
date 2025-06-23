import express, { Express } from 'express'
import userRouter from './routes/users'
import postRouter from './routes/posts'
import cors from 'cors'
import session from 'express-session'
const PORT = 8080

const app: Express = express()


app.use(cors({
    // origin: 'http://localhost:5173',
    // origin: '*',
    origin: true,
}))

// app.use(session({
//     secret: 'daydream_total_secret_key_mayn',
//     resave: false,
//     saveUninitialized: false
// }))

app.use(express.json())

app.use('/api/users/', userRouter)
app.use('/api/posts/', postRouter)
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`)
})