import express from 'express'
import path from 'path'

const app = express()
app.use(express.static('public'))
app.use(express.static('dist'))
app.use('', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server start on port ${port}`))