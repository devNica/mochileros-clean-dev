import * as express from 'express'

const app = express.application
const port = 3400

app.listen(port, () => console.log(`Server is running on port: ${port}`))
