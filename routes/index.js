import routes from "./routes.js"
import { connectToMongoDB } from "../config/mongoConnection.js"

await connectToMongoDB()

function constructor(app){    
    app.use('/', routes)
    app.use('*', (req, res)=>{res.status(404).json({error: "Not Found"})})
}

export default constructor