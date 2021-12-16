const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '7ad31e2b400a4251b2ff38473373e830',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express()



app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`welcome to basement ${port}`))