const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

connectToMongo();
app.use(express.json())

app.use(cors())
// Avilable Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`Echo Vault backend listening at http://localhost:${port}`)
})