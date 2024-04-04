import routes from "./routes.js"
import BBroutes from "./BBroutes.js"
import JSroutes from './JSroutes.js'
import { connectToMongoDB } from "../config/mongoConnection.js"

await connectToMongoDB()

function constructor(app){   
    app.use('/bb', BBroutes) 
    app.use('/js', JSroutes)
    app.use('/', routes)
    app.use('*', (req, res)=>{res.status(404).json({error: "Not Found"})})
}

export default constructor