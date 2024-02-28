import routes from "./routes.js"

function constructor(app){
    app.use('/', routes)
    app.use('*', (req, res)=>{res.status(404).json({error: "Not Found"})})
}

export default constructor