import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
//Initialize Express
const app = express()

///Middlewares
app.use(cors())
app.use(express.json())

//Connect to Database
try {
    await connectDB() 
} catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
}

//Routes 
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', clerkWebhooks)

//Port
const PORT = process.env.PORT || 9996

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

