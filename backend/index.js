const connectToMongo = require("./db")
const express = require('express')
const app = express()
const port = 5000

connectToMongo();
app.use(express.json())

// Avilable Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`Echo Vault backend listening at http://localhost:${port}`)
})