const db = require('../src/db')
const app = require('../src/app')
const createFolderIsNotExist = require('../src/helpers/create-folder')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 3600

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(process.env.UPLOAD_DIR)
    await createFolderIsNotExist(process.env.IMAGE_DIR)
    await createFolderIsNotExist(path.join(process.env.IMAGE_DIR, process.env.AVATAR_USERS_DIR))
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((e) => { console.log(`Server not running ${e.message}`) }
)
