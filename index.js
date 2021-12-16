const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '7ad31e2b400a4251b2ff38473373e830',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()
app.use(express.json())

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})


app.post('/api/student', (req, res)=> {
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    // COMPLETE
    rollbar.log('student added successfully', {author: "Dax", type: 'manual'})
    
    res.status(200).send(students)
})
app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`welcome to basement ${port}`))