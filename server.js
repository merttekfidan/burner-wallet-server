const app = require('./app')
const port = process.env.PORT



const server = app.listen(port || 8080,()=>{
    console.log('Server is ON !!' + server.address().port)
})