import express from 'express'
import morgan from 'morgan'
import searchcert from '../api/searchcert'

const app = express()
app.use('/v1', searchcert())

app.listen(process.env.PORT||3000, () => {
    console.log(`application listening on port ${process.env.PORT || 3000}`)
})