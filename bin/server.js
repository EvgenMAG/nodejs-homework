const app = require('../src/app')
const db = require('../src/db')

const PORT = process.env.PORT || 3600

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((e) => { console.log(`Server not running ${e.message}`) }
)
